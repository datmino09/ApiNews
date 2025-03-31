const UserRoute = require("./UserRoute");
const CommentRoute = require("./CommentRoute");
const ReportRoute = require("./ReportRoute");
const ArticleRoute = require("./ArticlesRoute");
const CategoryRoute = require("./CategoryRoute");
function routes(app) {
    app.use("/user", UserRoute);
    app.use("/comment",CommentRoute);
    app.use("/report",ReportRoute);
    app.use("/articles",ArticleRoute);
    app.use("/category",CategoryRoute);
  }
module.exports = routes;