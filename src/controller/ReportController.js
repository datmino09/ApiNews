const db = require("../models");
const Report = db.report;
class ReportComment{
    async addReport(req,res){
        try {
            const {comment_id, user_id, reason} = req.body;
            await Report.create({
                comment_id,user_id,reason
            });
            res.status(201).json({success:true});
        } catch (error) {
            res.status(500).json({message:"Lỗi: "+ error, success:false});
        }
    }
}
module.exports = new ReportComment();