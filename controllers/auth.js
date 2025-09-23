// auth.js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim()
    const user = await User.create({ ...req.body, email });
    const token = user.createJWT();
    console.log("JWT_SECRET is:", process.env.JWT_SECRET);
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || "Internal server error" });
  }
};
const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    console.log('Missing credentials:', {
      email: !!email,
      password: !!password
    })
    return res.status(400).json({message:"Email and password are required."})
  }

  email = email.toLowerCase().trim()

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

   
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
