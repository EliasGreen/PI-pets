const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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


const createNewUserInDB = (userInformation, req, res) => {
  bcrypt.hash(userInformation.password, saltRounds, (err, hash) => {
        if(!err) {
          const newUserDataSet = {
            email: userInformation.email,
            username: userInformation.username,
            password: hash,
            inventory: [
              { 
                type: "KeyPI",
                rarity: "Legendary",
                for: "BoxPI",
                cost: {
                  coins: 1000,
                  axioms: 10
                }
              },
              { 
                type: "BoxPI",
                rarity: "Legendary",
                openTool: "KeyPI",
                output: "Random PIpet",
                cost: {
                  coins: 500,
                  axioms: 8
                }
              },
              {
                type: "FOOD__can",
                cost: {
                  coins: 37,
                  axioms: 1
                },
                waterValue: 1,
                foodValue: 3
              },
              {
                type: "WATER__bottle",
                cost: {
                  coins: 26,
                  axioms: 1
                },
                waterValue: 4,
                foodValue: 0
              }
            ],
            meta: {
             food: []
            }
          };
          const newUser = new userModel(newUserDataSet);
          newUser.save(err => {
            if (!err) {
              req.login(newUser["id"], () => {
                res.status(201).redirect("https://pi-pets.glitch.me/playground");
              });
            }
            else {
              res.sendStatus(501);
            }
          });
        }
        else {
          res.sendStatus(501);
        }
  });
};

/*
*  @signup POST
*  @dest: authenticating/signup
*  @security: public
*/
router.post("/signup", urlencodedParser, jsonParser, (req, res) => {
  const { email, username, password } = req.body;
  const userInformation = {
    email: email,
    username: username,
    password: password
  };
  
  // Check if user already exists
  userModel.findOne({email: email}, (err, user) => {
              if(!err) {
                if(!user) {
                      createNewUserInDB(userInformation, req, res);  
                    }
                else {
                 res.sendStatus(409);
                }
              }
              else {
                res.sendStatus(500);
              }
        });
});

/*
*  @login POST
*  @dest: authenticating/login
*  @security: public
*/
router.post("/login", urlencodedParser, jsonParser, (req, res) => {
  const { email, username, password } = req.body;
  
  userModel.findOne({email: email}, (err, user) => {
    if(!err) {
      if(user) {
        bcrypt.compare(password, user.password, (err, bcryptResponse) => {
          if(bcryptResponse === true) {
            req.login(user["id"], () => {
               res.status(201).redirect("https://pi-pets.glitch.me/playground");
            });
          }
          else {
            res.sendStatus(409); 
          }
        });
      }
      else {
        res.sendStatus(409); 
      }
    }
    else {
      res.sendStatus(404); 
    }
  });
});

module.exports = router;