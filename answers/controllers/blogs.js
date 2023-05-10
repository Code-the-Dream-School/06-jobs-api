'use strict';
const Blog = require('../models/Blog');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllBlogs = async (req, res) => {
  res.send('get all blogs');
};

const getBlog = async (req, res) => {
  res.send('get blog');
};

const createBlog = async (req, res) => {
  // res.send('create blog');
  req.body.createdBy = req.user.userId;
  const blog = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ blog });
};

const updateBlog = async (req, res) => {
  res.send('update blog');
};

const deleteBlog = async (req, res) => {
  res.send('delete blog');
};

module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};