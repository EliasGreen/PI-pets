const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const randomBoxSchema = new Schema({
  rarity: String,
  openTool: String,
  output: String,
  cost: Number
});

module.exports = randomBoxSchema;