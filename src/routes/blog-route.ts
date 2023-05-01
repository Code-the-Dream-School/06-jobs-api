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
Router.route("/").post(protect, createBlog);
Router.route("/comment/:id").post(protect, addComment);
Router.route("/my-blogs").get(protect, getMyBlogs);
Router.route("/:id").get(getOneBlog);
Router.route("/:id").patch(protect, updateBlog).delete(protect, deleteBlog);

module.exports = Router;

export {};
