const express = require("express");
const route = express.Router();
const ReportController = require("../controller/ReportController");
route.post("/", ReportController.create);
route.get("/", ReportController.getAll);
route.delete("/:id", ReportController.remove);
module.exports = route;