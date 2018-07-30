const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const loginCheck = require("../middlewares/loginCheck");

const mongoDB__utils = require("../utils/mongoDB");
const userModel = require("../mongoDBmodels/userModel");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

const passport = require("passport");
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser((user_id, done) => {
  done(null, user_id);
});
passport.deserializeUser((user_id, done) => {
  done(null, user_id);
});

/*
*  @information GET
*  @dest: send the requested user information
*  @security: private
*/
router.get("/information", loginCheck, (req, res) => {
  userModel.findById(req.session.passport.user, "username coins pets meta xp", (err, user) => {
    if(!err) {
      res.status(200).json({
        username: user.username,
        coins: user.coins,
        petsAmount: user.pets.length,
        food: user.meta.food,
        xp: user.xp
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information GET
*  @dest: send the requested user inventory
*  @security: private
*/
router.get("/inventory", loginCheck, (req, res) => {
  userModel.findById(req.session.passport.user, "inventory", (err, user) => {
    if(!err) {
      res.status(200).json({
        inventory: user.inventory
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information GET
*  @dest: send the requested user pets
*  @security: private
*/
router.get("/pets", loginCheck, (req, res) => {
  userModel.findById(req.session.passport.user, "pets", (err, user) => {
    if(!err) {
      res.status(200).json({
        pets: user.pets
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: delete opened box and key from DB and add drop from it into user's inventory (in DB)
*  @security: private
*/
router.post("/open-box", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { currentPickedKeyPosition, currentPickedBoxPosition, drop } = req.body;
  
  userModel.findById(req.session.passport.user, "pets inventory", (err, user) => {
    if (!err) {
      user.inventory = (user.inventory.splice(currentPickedKeyPosition, 1)).splice(currentPickedBoxPosition, 1);
      
      if (drop.petColors) {
        user.pets.push(drop);
      }
      else {
        user.inventory.push(drop);
      }
      
      user.save();
      res.sendStatus(200);
    }
    else {
      res.sendStatus(409); 
    }
  });
});

module.exports = router;