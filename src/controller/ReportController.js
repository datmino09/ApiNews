const db = require("../models");
const Report = db.report;
class ReportController {
  async create(req, res) {
        try {
            const { comment_id, user_id, reason } = req.body;

          
            if (!comment_id || !user_id || !reason) {
                return res.status(400).json({ message: "Thiếu thông tin báo cáo!" });
            }

          
            const comment = await Comment.findByPk(comment_id);
            if (!comment) {
                return res.status(404).json({ message: "Không tìm thấy bình luận!" });
            }

   
            const newReport = await Report.create({ comment_id, user_id, reason });
            res.status(201).json({ message: "Báo cáo đã được gửi!", report: newReport });
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }

  
    async getAll(req, res) {
        try {
            const reports = await Report.findAll({
                include: [
                    { model: Comment, as: "comment" },
                    { model: User, as: "user" }
                ]
            });
            res.json(reports);
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }


    async remove(req, res) {
        try {
            const { id } = req.params;

     
            const report = await Report.findByPk(id);
            if (!report) {
                return res.status(404).json({ message: "Không tìm thấy báo cáo!" });
            }

         
            await Report.destroy({ where: { id } });
            res.json({ message: "Xóa báo cáo thành công!" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error.message });
        }
    }
}
module.exports = new ReportController;