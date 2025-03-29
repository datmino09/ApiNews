const db  = require("../models");
const User = db.user;
class UserController{
    async getAll (req,res){
        try {
            const users = await User.findAll({});
            res.json(users);
        } catch (error) {
            res.status(500).json({message: "Lỗi: "+error});
        }
    }
}
module.exports = new UserController();