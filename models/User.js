// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 50,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true, // ensures emails are stored in lowercase
    trim: true, // removes whitespace
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
