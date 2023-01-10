const express = require("express");
const { sequelize } = require('./models'); 

const app = express();

// env setting
require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.listen(PORT, async() => {
    console.log("Server don start for port:" + PORT);
    await sequelize.authenticate();
    console.log("db authenticated");
});
