const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

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
  userModel.findById(req.session.passport.user, (err, user) => {
    if(!err) {
      console.log("Got GER REQUEST! INFORMATION");
      res.status(200).json({
        username: user.username,
        coins: user.coins,
        pets: user.pets.length,
        food: user.meta.food
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

module.exports = router;