const db  = require("../models");
const Category = db.category;
class CategoryController{
    
    async getAll (req,res){
        try {
            const users = await Category.findAll({});
            res.json(users);
        } catch (error) {
            res.status(500).json({message: "Lỗi: "+error});
        }
    }

    async create(req, res) {
        try {
            
            const { name } = req.body;
    
            if (!name ) {
                return res.status(400).json({ message: "Cần nhập tên danh mục" });
            }
    
            const newCategory = await Category.create({ name });
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }
    

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const [updated] = await Category.update(
                { name },
                { where: { id } }
            );
            if (!updated) {
                return res.status(404).json({ message: "Không tìm thấy bài viết để cập nhật!" });
            }
            const updatedCaterogy = await Category.findByPk(id);
            res.json(updatedCaterogy);
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Category.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: "Không tìm thấy bài viết để xóa!" });
            }
            res.json({ message: "Xóa thành công!" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }
}
module.exports = new CategoryController();