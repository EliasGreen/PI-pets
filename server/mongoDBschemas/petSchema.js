const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const petSchema = new Schema({
  type: String,
  bodyColors: {
    top: String,
    center: String,
    down: String,
    details: String
  },
  nickname: String,
  specialist: String,
  sex: String,
  pregnant: { type: Boolean, default: false },
  timeOfpregnant: { type: Number, min: 0, max: 9, default: 0},
  rarity: String,
  birthdate: { type: Date, default: Date.now },
  foodPoints:  { type: Number, min: 0, max: 12, default: 12},
  waterPoints:  { type: Number, min: 0, max: 12, default: 12},
  hitPoints:  { type: Number, min: 0, max: 100, default: 100},
  happinessPoints: { type: Number, min: 0, max: 20, default: 20},
  attack: { type: Number, min: 0, max: 100, default: 5},
  defense: { type: Number, min: 0, max: 20, default: 1}
});

module.exports = petSchema;