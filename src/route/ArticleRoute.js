const express = require("express");
const route = express.Router();
const ArticleController = require("../controller/ArticlesController");

route.post("/", ArticleController.create);
route.put("/:id", ArticleController.update);
route.delete("/:id", ArticleController.remove);
module.exports = route;
