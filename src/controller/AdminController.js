const { where } = require("sequelize");
const db  = require("../models");
const Admin = db.admin;
class AdminController{
    async login(req,res){
        try{
            const {username,password} = req.body;
            const admin = await Admin.findOne({
                where:{
                    username,
                    password
                }
            });
            if(!admin){
                return res.status(404).json({messeage:"Sai tên tài khoản hoặc mật khẩu"});
            }
            res.status(200).json({messeage:"Đăng nhập thành công",data:admin})
        }catch(error){
            res.json({messeage:"Lỗi: "+error});
        }
    }
}
module.exports = new AdminController();
