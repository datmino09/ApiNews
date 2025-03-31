const { where } = require("sequelize");
const db = require("../models");
const Comment = db.comment;
class CommentController{
    async addComment(req,res){
        try {
            const {content,article_id,user_id} = req.body;
            await Comment.create({
                content,article_id,user_id
            })
            res.status(201).json({success:true});
        } catch (error) {
            res.status(500).json({message:"Lỗi: " + error, success:false});
        }
    }
    async getCommentByArticle_ID(req,res){
        try {
            const {article_id} = req.params;
            const comments = await Comment.findAll({
                where:{article_id}
            });
            if(comments.length===0){
                return res.status(404).json({message:"Không tìm thấy"});
            }
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({message:"Lỗi: "+error});
        }
    }
}
module.exports = new CommentController ();