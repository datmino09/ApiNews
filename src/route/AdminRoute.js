const express = require("express");
const route = express.Router();
const AdminController = require("../controller/AdminController");
route.post("/login",AdminController.login);
module.exports = route;
