const UserRoute = require("./UserRoute");
const CommentRoute = require("./CommentRoute");
const ArticleRoute = require("./ArticlesRoute");
const CategoryRoute = require("./CategoryRoute");
const AdminRoute = require("./AdminRoute");
const express = require('express');
const path = require("path");
function routes(app) {
    app.use("/user", UserRoute);
    app.use("/comment",CommentRoute);
    app.use("/articles",ArticleRoute);
    app.use("/category",CategoryRoute);
    app.use("/admin",AdminRoute);
    app.use("/uploads", express.static(path.join(__dirname,"../uploads")));
  }
module.exports = routes;
