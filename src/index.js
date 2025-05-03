const express = require('express');
const cors = require('cors');
const routes = require("./route");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
require("./connectionDB");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes(app);
app.listen(3001, async () => {
    console.log("Server chạy tại http://localhost:3001");
});