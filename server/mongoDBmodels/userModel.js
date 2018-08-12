const mongoose = require("mongoose");
const petSchema = require("../mongoDBschemas/petSchema");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  pets: { type: [petSchema], default: [] },
  coins: { type: Number, default: 100 },
  axioms: { type: Number, default: 9 },
  xp: { type: Number, default: 0 },
  inventory: [],
  meta: {
    registrationDate: { type: Date, default: Date.now }
  }
}, { usePushEach: true });
const userModel = mongoose.model("pi-pets-users", userSchema);

module.exports = userModel;