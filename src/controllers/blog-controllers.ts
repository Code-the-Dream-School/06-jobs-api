import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catch-async";
import { customError } from "../../errors/error";
import blogModel from "../../src/model/blog-model";

export const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.createdBy = req.userModel;
    const newBlog = await blogModel.create(req.body);
    res.status(201).json({
      newBlog,
    });
  }
);

export const getAllBlogs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await blogModel
      .find()
      .populate("createdBy")
      .sort({ _id: -1 });

    res.status(200).json({
      success: "true",
      blogs,
    });
  }
);
export const getMyBlogs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.userModel;
    const blogs = await blogModel.find({ createdBy: id });
    res.status(200).json({
      success: "true",
      blogs,
    });
  }
);
export const getOneBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.userModel;
    const blog = await blogModel
      .findOne({ createdBy: id, _id: req.params.id })
      .populate("createdBy");

    if (!blog) {
      return next(customError("there is no blog found", 404));
    }
    res.status(200).json({
      success: "true",
      blog,
    });
  }
);
export const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.userModel;
    const blog = await blogModel
      .findOneAndUpdate({ createdBy: id, _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      .populate("createdBy");
    if (!blog) {
      return next(customError("there is no blog found", 404));
    }
    res.status(200).json({
      success: "true",
      blog,
    });
  }
);
export const addComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.author = req.userModel._id;
    const blog = await blogModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: req.body } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!blog) {
      return next(customError("there is no blog with such id", 404));
    }
    res.status(200).json({
      success: "true",
      blog,
    });
  }
);
export const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id: id } = req.userModel;
    const blog = await blogModel.findOneAndDelete({
      createdBy: id,
      _id: req.params.id,
    });
    if (!blog) {
      return next(customError("there is no blog with such id", 404));
    }
    res.status(200).json({
      success: "true",
    });
  }
);
