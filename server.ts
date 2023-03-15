const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE?.replace(
  "<password>",
  `${process.env.DATABASE_PASSWORD}`
);
mongoose.set("strictQuery", true);

const start = async () => {
  const PORT = process.env.PORT || 8000;

  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
    })
    .then(() => console.log("database connection successful"));

  app.listen(PORT, () => {
    console.log(`server connected successfully at port ${PORT}`);
  });
};

start();

export {};
