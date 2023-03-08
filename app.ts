import { Request, Response, NextFunction } from "express";
const express = require("express");
const { globalErrorHandler } = require("./errors/error-controller");
const blogRouter = require("./routes/blog-route");
const userRouter = require("./routes/user-route");
const app = express();
app.use(express.json());

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: "not found",
    message: `can't find ${req.url} on this server`,
  });
});
app.use(globalErrorHandler);
module.exports = app;
