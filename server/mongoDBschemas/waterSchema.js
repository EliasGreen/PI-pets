const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const waterSchema = new Schema({
  type: String,
  cost: Number,
  waterValue: {type: Number, min: 0, max: 12}
});

module.exports = waterSchema;