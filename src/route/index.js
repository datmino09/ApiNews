const UserRoute = require("./UserRoute");
function routes(app) {
    app.use("/user", UserRoute);
  }
module.exports = routes;