const express = require("express");
const Router = express.Router();
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
} from "../controllers/blog-controllers";

Router.route("/").post(createBlog).get(getAllBlogs);
Router.route("/:id").patch(updateBlog).get(getOneBlog).delete(deleteBlog);

module.exports = Router;

export {};
