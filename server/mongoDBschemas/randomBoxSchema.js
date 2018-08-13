const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const randomBoxSchema = new Schema({
  type: String,
  rarity: String,
  openTool: String,
  output: String,
  cost: {
    coins: Number,
    axioms: Number
  }
});

module.exports = randomBoxSchema;