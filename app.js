'use strict';
require('dotenv').config();
require('express-async-errors');
const express = require('express'),
  app = express();

// connectDB
const connectDB = require('./answers/db/connect');
const authenticateUser = require('./answers/middleware/authentication');

// routers
const authRouter = require('./answers/routes/auth');
const blogsRouter = require('./answers/routes/blogs');

// error handler
const notFoundMiddleware = require('./answers/middleware/not-found');
const errorHandlerMiddleware = require('./answers/middleware/error-handler');

app.use(express.json());
// extra packages

// routes
// app.get('/', (req, res) => {
//   res.send('projects api');
// });
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs',authenticateUser, blogsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();