const UserRoute = require("./UserRoute");
const CommentRoute = require("./CommentRoute");
const ReportRoute = require("./ReportRoute");
function routes(app) {
    app.use("/user", UserRoute);
    app.use("/comment",CommentRoute);
    app.use("/report",ReportRoute);
  }
module.exports = routes;