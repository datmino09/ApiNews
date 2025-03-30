const db  = require("../models");
const Article = db.articles;
class ArticleController{
    

    async create(req, res) {
        try {
            
            const { title, content, image, author } = req.body;
    
            if (!title || !content || !image || !author) {
                return res.status(400).json({ message: "Thiếu thông tin bài viết!" });
            }
    
            const newArticle = await Article.create({ title, content, image, author });
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }
    

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content, image, author } = req.body;
            const [updated] = await Article.update(
                { title, content, image, author },
                { where: { id } }
            );
            if (!updated) {
                return res.status(404).json({ message: "Không tìm thấy bài viết để cập nhật!" });
            }
            const updatedArticle = await Article.findByPk(id);
            res.json(updatedArticle);
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Article.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: "Không tìm thấy bài viết để xóa!" });
            }
            res.json({ message: "Xóa thành công!" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }
}
module.exports = new ArticleController();