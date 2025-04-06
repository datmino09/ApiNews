const UserRoute = require("./UserRoute");
const CommentRoute = require("./CommentRoute");
const ArticleRoute = require("./ArticlesRoute");
const CategoryRoute = require("./CategoryRoute");
const AdminRoute = require("./AdminRoute");
function routes(app) {
    app.use("/user", UserRoute);
    app.use("/comment",CommentRoute);
    app.use("/articles",ArticleRoute);
    app.use("/category",CategoryRoute);
    app.use("/admin",AdminRoute)
  }
module.exports = routes;
