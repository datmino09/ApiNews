const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..','uploads'));
    },
    filename: (req,file,cb) =>{
        const tenFile = Date.now().toString();
        cb(null,tenFile+path.extname(file.originalname));
    }
})
const upload = multer({storage});
module.exports = upload;