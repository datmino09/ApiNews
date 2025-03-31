const express = require("express");
const route = express.Router();
const ReportController = require("../controller/ReportController");
route.post("/addReport",ReportController.addReport);
module.exports = route;