const express = require("express");
const route = express.Router();
const CategoryController = require("../controller/CategoryController");
route.get("/",CategoryController.getAll)
route.post("/", CategoryController.create);
route.put("/:id", CategoryController.update);
route.delete("/:id", CategoryController.remove);
module.exports = route;