const ArticlesController = require("../controller/ArticlesController");
const UserRoute = require("./UserRoute");
const ArticleRoute = require("./ArticleRoute");
const Report = require("./Report");
function routes(app) {
    app.use("/user", UserRoute);
    app.use("/articles", ArticleRoute);
    app.use("/report", Report);
    
  }
module.exports = routes;