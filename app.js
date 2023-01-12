const express = require('express');
const authRouter = require('./routes/auth.js');
const postRouter = require('./routes/posts.js');
const { sequelize } = require('./models'); 

const app = express();

// env setting
require("dotenv").config();

app.use(express.json());
app.use(authRouter);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    console.log("Server don start for port:" + PORT);
    await sequelize.authenticate();
    console.log("db authenticated");
});
