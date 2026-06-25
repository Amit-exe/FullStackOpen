const connectDB = require("./utils/db");
const blogRouter = require("./routers/blog.route");
const { tokenExtractor, errorHandler } = require("./utils/middleware");

const dns = require("node:dns");
const express = require("express");

const userRouter = require("./routers/user.route");
const commentRouter = require("./routers/comment.router");

const app = express();
dns.setServers(["8.8.8.8", "8.8.4.4"]);
connectDB();

app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);
app.use("/api/blogs", commentRouter);

app.use(errorHandler);

module.exports = app;
