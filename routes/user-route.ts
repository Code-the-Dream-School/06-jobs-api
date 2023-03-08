import { login, signUp } from "../controllers/auth-controller";

const express = require("express");
const Router = express.Router();

Router.route("/sign-up").post(signUp);
Router.route("/login").post(login);

module.exports = Router;

export {};
