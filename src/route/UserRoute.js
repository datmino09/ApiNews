const express = require("express");
const route = express.Router();
const UserController = require("../controller/UserController");
route.get("/", UserController.getAll);
route.post("/auth/google",UserController.googleLogin);
module.exports = route;
