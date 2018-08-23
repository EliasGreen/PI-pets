const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const loginCheck = require("../../middlewares/loginCheck");

const mongoDB__utils = require("../../utils/mongoDB");
const userModel = require("../../mongoDBmodels/userModel");

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
*  @dest: send battleLogs from users DB
*  @security: private
*/
router.get("/logs", loginCheck, (req, res) => {
  userModel.findById(req.session.passport.user, "battleLogs", (err, user) => {
    if(!err) {
      res.status(200).json({
        battleLogs: user.battleLogs
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: create battle log in DB
*  @security: private
*/
router.post("/logs", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { battleLog } = req.body;
  
  userModel.findById(req.session.passport.user, "battleLogs", (err, user) => {
    if (!err) {
      if (user.battleLogs.length === 10) {
        user.battleLogs.shift();
        user.battleLogs.push(battleLog);
      }
      else {
        user.battleLogs.push(battleLog);
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