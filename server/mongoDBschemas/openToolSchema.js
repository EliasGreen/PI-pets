const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const openToolSchema = new Schema({
  type: String,
  rarity: String,
  for: String,
  cost: {
    coins: Number,
    axioms: Number
  }
});

module.exports = openToolSchema;