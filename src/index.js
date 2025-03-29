const express = require('express');
const cors = require('cors');
const routes = require("./route");
const app = express();
require("./connectionDB");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes(app);
app.listen(3001, async () => {
    console.log("Server chạy tại http://localhost:3001");
});