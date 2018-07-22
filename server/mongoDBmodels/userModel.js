const mongoose = require("mongoose");
const petSchema = require("../mongoDBschemas/petSchema");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  pets: [petSchema],
  coins: Number,
  inventory: [],
  meta: {
   registrationDate: { type: Date, default: Date.now },  
  }
});
const userModel = mongoose.model("pi-pets-users", userSchema);

module.exports = userModel;