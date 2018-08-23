const mongoose = require("mongoose");
const petSchema = require("./petSchema");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const battleLogSchema = new Schema({
  type: String,
  userPet: petSchema,
  enemy: {
    name: String,
    lvl: Number,
    pet: petSchema
  },
  date: { type: Date, default: Date.now() },
  status: { type: String, default: "unknown" }
});

module.exports = battleLogSchema;