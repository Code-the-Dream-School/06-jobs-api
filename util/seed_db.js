require("dotenv").config();

const seed_db = async () => {
  // Dynamically import ESM modules
  const { fakerEN_US: faker } = await import("@faker-js/faker");
  const FactoryBot = await import("factory-bot");
  const { default: Recipe } = await import("../models/Recipe.js");
  const { default: User } = await import("../models/User.js");

  // Prepare faker + factory
  const testUserPassword = faker.internet.password();
  const factory = FactoryBot.factory;
  const factoryAdapter = new FactoryBot.MongooseAdapter();
  factory.setAdapter(factoryAdapter);

  // Define Recipe factory
  factory.define("recipe", Recipe, {
    title: () => faker.commerce.productName(),
    ingredients: () => faker.commerce.productDescription(),
    difficulty: () =>
      ["Easy", "Medium", "Hard"][Math.floor(3 * Math.random())],
  });

  // Define User factory
  factory.define("user", User, {
    name: () => faker.person.fullName(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
  });

  // Seed database
  let testUser = null;
  try {
    const mongoURL = process.env.MONGO_URI_TEST;
    await Recipe.deleteMany({});
    await User.deleteMany({});
    testUser = await factory.create("user", { password: testUserPassword });
    await factory.createMany("recipe", 20, { createdBy: testUser._id });
  } catch (e) {
    console.log("database error:", e.message);
    throw e;
  }

  return { testUser, testUserPassword };
};

module.exports = { seed_db };
