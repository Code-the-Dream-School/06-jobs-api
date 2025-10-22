// controllers/auth.js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }

    email = email.trim().toLowerCase();

    // Create user
    const user = await User.create({ email, password });

    // Create JWT
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      user: { email: user.email },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === 11000) {
      // Duplicate email
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthenticatedError("Invalid credentials.");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials.");
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
      user: { email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    if (
      error instanceof BadRequestError ||
      error instanceof UnauthenticatedError
    ) {
      return res
        .status(error.statusCode)
        .json({ error: error.message });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error." });
  }
};

module.exports = {
  register,
  login,
};
