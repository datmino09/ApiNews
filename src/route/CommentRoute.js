const express = require("express");
const route = express.Router();
const CommentController = require("../controller/CommentController");
route.post("/addComment",CommentController.addComment);
route.get("/:article_id",CommentController.getCommentByArticle_ID);
route.delete("/:id",CommentController.deleteComment);
module.exports = route;