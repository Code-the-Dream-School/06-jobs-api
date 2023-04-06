import { Request, Response, NextFunction } from "express";

////
// const { Request, Response, NextFunction } = require('express');
const express = require("express");
const { globalErrorHandler } = require("./errors/error-controller");
const blogRouter = require("./src/routes/blog-route");
const userRouter = require("./src/routes/user-route");
const cors = require("cors");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(xssClean());
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
