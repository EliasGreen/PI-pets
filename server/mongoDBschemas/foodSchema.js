const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const foodSchema = new Schema({
  type: String,
  cost: Number,
  foodValue: {type: Number, min: 0, max: 12},
  waterValue: {type: Number, min: 0, max: 12}
});

module.exports = foodSchema;