import User from "../../src/model/user-model";
import catchAsync from "../../utils/catch-async";
import { Request, Response, NextFunction } from "express";
import { customError } from "../../errors/error";

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
      // expiresIn: process.env.JWT_EXPIRES_IN,
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
    const correctPassword = await user?.correctPassword(
      password,
      user.password
    );

    if (!correctPassword) {
      return next(customError("wrong password please try again", 404));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      // expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "success",
      token,
      user,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(
        customError("you are not logged in please log in to have access", 404)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return next(
        customError(
          "json web token is invalid please provide a valid token",
          404
        )
      );
    }

    const { id } = decoded;
    const user = await User.findById(id);

    req.userModel = user;

    next();
  }
);
