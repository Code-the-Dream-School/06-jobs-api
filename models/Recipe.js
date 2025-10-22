const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide recipe name"],
      maxlength: 50,
    },
    ingredients: {
      type: String,
      required: [true, "Please provide ingredients"],
      maxlength: 500,
    },
    method: {
      type: String,
    },
difficulty: {
  type: String,
  enum: ["Easy", "Medium", "Hard"],
  default: "Medium"
},
prepTime: {
  type: Number,
  required: [true, "Please provide preparation time"],
  min: [1, "Preparation time must be at least 1 minute"],
},
isVegetarian: {
  type: Boolean,
  default: false,
},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
