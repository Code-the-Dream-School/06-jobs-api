declare namespace Express {
  interface Request {
    userModel?: import("./src/model/user-model").default;
  }
}
