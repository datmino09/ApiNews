const { where,Op } = require("sequelize");
const db = require("../models");
const Article = db.articles;
const ArticleCategory = db.article_category;
class ArticleController {
  async getAll(req, res) {
    try {
      let { page, limit } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const offset = (page - 1) * limit;
      const { count, rows } = await Article.findAndCountAll({
        include: [
          {
            model: ArticleCategory,
            as: "article_categories",
          },
        ],
        distinct:true,
        limit,
        offset,
      });
      if (count === 0)
        return res.status(404).json({ message: "Không tìm thấy" });
      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        articles: rows,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error });
    }
  }
  async getByCategory(req, res) {
    try {
      let { page, limit } = req.query;
      const { category_id } = req.params;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const offset = (page - 1) * limit;
      const { count, rows } = await Article.findAndCountAll({
        include: [
          {
            model: ArticleCategory,
            as: "article_categories",
            where: { category_id }, // Lọc theo danh mục
          },
        ],
        distinct:true,
        limit,
        offset,
      });
      if (count === 0)
        return res.status(404).json({ message: "Không tìm thấy" });
      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        articles: rows,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error });
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id, {
        include: [{ model: ArticleCategory, as: "article_categories" }],
      });
      if (!article)
        return res.status(404).json({ message: "Không tìm thấy" });
      res.status(200).json({
        article,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error });
    }
  }
  async searchArticle(req,res){
    try {
      let { page, limit, keyword } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const offset = (page - 1) * limit;
      const {count,rows} = await Article.findAndCountAll({
        where:{
          title: {
            [Op.like]: `%${keyword}%`
          },
        },include: [
          {
            model: ArticleCategory,
            as: "article_categories",
          },
        ],
        distinct:true,
        limit,
        offset,
      });
      if(count===0){
        return res.status(404).json({message:"Không tìm thấy"});
      }
      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        articles: rows,
      });
    } catch (error) {
      res.status(500).json({message:"Lỗi: "+error});
    }
  }
  async create(req, res) {
    try {
      const { title, content, image, author, category_ids } = req.body; // category_id là array nha

      if (!title || !content || !image || !author) {
        return res.status(400).json({ message: "Thiếu thông tin bài viết!" });
      }

      const newArticle = await Article.create({
        title,
        content,
        image,
        author,
      });
      if (Array.isArray(category_ids) && category_ids.length > 0) {
        await newArticle.addCategory_id_categories(category_ids);
      }

      res.status(201).json({ message: "Thêm thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, image, author, category_ids } = req.body;
      const article = await Article.findByPk(id);
      if (!article) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy bài viết để cập nhật!" });
      }
      await article.update({ title, content, image, author });
      if (Array.isArray(category_ids)) {
        // Lấy danh sách các danh mục hiện tại của bài viết
        const currentCategories = await article.getCategory_id_categories();
        const currentCategoryIds = currentCategories.map((cat) => cat.id);

        // Xác định các danh mục cần thêm và cần xóa
        const categoriesToAdd = category_ids.filter(
          (id) => !currentCategoryIds.includes(id)
        );
        const categoriesToRemove = currentCategoryIds.filter(
          (id) => !category_ids.includes(id)
        );

        // Thêm các mối quan hệ mới
        if (categoriesToAdd.length > 0) {
          await article.addCategory_id_categories(categoriesToAdd);
        }

        // Xóa các mối quan hệ không còn tồn tại
        if (categoriesToRemove.length > 0) {
          await article.removeCategory_id_categories(categoriesToRemove);
        }
      }
      res.json({ message: "Update thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id);
      if (!article) {
        return res.status(404).json({ message: "Không tìm thấy bài viết để xóa!" });
      }
      await article.setCategory_id_categories([]);
      await article.destroy();
  
      res.json({ message: "Xóa thành công!" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi: " + error.message });
    }
  }
  
}
module.exports = new ArticleController();
