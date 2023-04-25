const express = require("express");
const Router = express.Router();
import { protect } from "../controllers/auth-controller";
import {
  addComment,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getOneBlog,
  updateBlog,
} from "../controllers/blog-controllers";

Router.route("/").get(getAllBlogs);
Router.route("/:id").get(getOneBlog);
Router.use(protect);

Router.route("/").post(createBlog);
Router.route("/my-blogs").get(getMyBlogs);
Router.route("/comment/:id").post(addComment);
Router.route("/:id").patch(updateBlog).delete(deleteBlog);

module.exports = Router;

export {};
