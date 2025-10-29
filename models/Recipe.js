const mongoose = require("mongoose");


const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true }, // <- array of strings
  method: { type: String, required: true },
  difficulty: { type: String, required: true },
  prepTime: { type: Number, required: true },
  isVegetarian: { type: Boolean, default: false },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Recipe", RecipeSchema);


module.exports = mongoose.model("Recipe", RecipeSchema);
