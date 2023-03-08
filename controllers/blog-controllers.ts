import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catch-async";
import { customError } from "../errors/error";
import blogModel from "../model/blog-model";

export const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
      message: "new blog",
    });
  }
);
export const getAllBlogs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "all blogs",
    });
  }
);
export const getOneBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "one blog",
    });
  }
);
export const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "update blog",
    });
  }
);

export const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "delete blog",
    });
  }
);
