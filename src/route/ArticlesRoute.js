const express = require("express");
const route = express.Router();
const ArticleController = require("../controller/ArticlesController");
route.get("/getByCategoryId/:category_id",ArticleController.getByCategory);
route.get("/getByArticleId/:id",ArticleController.getById);
route.get("/",ArticleController.getAll)
route.post("/", ArticleController.create);
route.put("/:id", ArticleController.update);
route.delete("/:id", ArticleController.remove);
module.exports = route;