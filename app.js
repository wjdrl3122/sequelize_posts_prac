const express = require('express');
const authRouter = require('./routes/auth.js');
const postRouter = require('./routes/posts.js');
const commentRouter = require('./routes/comments.js')
const { sequelize } = require('./models'); 

const app = express();

// env setting
require("dotenv").config();

app.use(express.json());
app.use(authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    console.log("Server don start for port:" + PORT);
    await sequelize.authenticate();
    console.log("db authenticated");
});
