const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    pets: Array,
    coins: Number,
    meta: {
     food: Array,
     registrationDate: { type: Date, default: Date.now },  
    }
});
const userModel = mongoose.model("pi-pets-users", userSchema);

module.exports = userModel;