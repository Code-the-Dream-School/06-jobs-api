import { Schema, model, Types } from "mongoose";
const bcrypt = require("bcryptjs");
const validator = require("validator");

interface Iuser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  correctPassword: (candidatePassword: string, password: string) => any;
}
const schema = new Schema<Iuser>({
  name: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [validator.isEmail, "please use a valid email address"],
  },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

schema.methods.correctPassword = async (
  candidatePassword: string,
  password: string
) => {
  return await bcrypt.compare(candidatePassword, password);
};

const userModel = model<Iuser>("User", schema);
export default userModel;
