// app.js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const app = express();

// Routers
const recipesRouter = require("./routes/recipesRoute.js");
const authRouter = require("./routes/authRoute");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// connectDB
const connectDB = require("./db/connect");

// authentication middlware
const authenticateUser = require("./middleware/authentication");

// determine mongoURL
let mongoURL = process.env.MONGO_URI;
if (process.env.NODE_ENV == "test") {
  mongoURL = process.env.MONGO_URI_TEST;
}

// Setup EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());



// serve static front-end files from "public"
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipesRouter);

// Serve index.html for all other routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});




// test
app.get("/multiply", (req, res) => {
  const first = parseFloat(req.query.first)
  const second = parseFloat(req.query.second)
  let result;

  if (isNaN(first) || isNaN(second)) {
    result = "NaN";
  } else {
    result = first * second  
  }
  res.json({ result: result });
});

// handle errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(mongoURL)
    app.listen(port, () => 
      console.log(`Server is listening on port ${port}`)
    )
  } catch (error) {
    console.log(error);
  };
};

start();

module.exports = { app }