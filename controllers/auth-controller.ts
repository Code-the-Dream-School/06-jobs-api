import User from "../model/user-model";
import catchAsync from "../utils/catch-async";
import { Request, Response, NextFunction } from "express";
import { customError } from "../errors/error";

//////
const jwt = require("jsonwebtoken");

////
export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = req.body;

    const user = await User.create({
      email,
      password,
      name,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "success",
      token,
      user,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(customError("wrong email or password Try again", 404));
    }
    const decoded = await user?.correctPassword(password, user.password);

    if (!decoded) {
      return next(customError("wrong password please try again", 404));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "success",
      token,
      user,
    });
  }
);
