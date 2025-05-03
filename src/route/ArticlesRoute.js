const express = require("express");
const route = express.Router();
const ArticleController = require("../controller/ArticlesController");
const upload = require('../middleware/uploads');
route.get("/getByCategoryId/:category_id",ArticleController.getByCategory);
route.get("/getByArticleId/:id",ArticleController.getById);
route.get("/search",ArticleController.searchArticle);
route.get("/",ArticleController.getAll)
route.post("/", upload.single('image'), ArticleController.create);
route.put("/:id", ArticleController.update);
route.delete("/:id", ArticleController.remove);
module.exports = route;