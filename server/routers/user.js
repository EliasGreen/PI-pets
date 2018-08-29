const express = require("express");
const router = express.Router();

const battles_router = require("./user/battles");
router.use("/battles", battles_router);

const bodyParser = require("body-parser");

const listOfUsersSockets = require("../utils/listOfUsersSockets");

const loginCheck = require("../middlewares/loginCheck");

const getItemByItsName = require("../utils/getItemByItsNameFunction");

const mongoDB__utils = require("../utils/mongoDB");
const userModel = require("../mongoDBmodels/userModel");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

const MAX_CELLS_INVENTORY = 25;

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
  userModel.findById(req.session.passport.user, "username coins pets meta xp axioms", (err, user) => {
    if(!err) {
      res.status(200).json({
        username: user.username,
        coins: user.coins,
        axioms: user.axioms,
        petsAmount: user.pets.length,
        food: user.meta.food,
        xp: user.xp,
        userID: req.session.passport.user
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information GET
*  @dest: get pet by ID
*  @security: private
*/
router.get("/pet/:id", loginCheck, (req, res) => {
  userModel.findById(req.session.passport.user, "pets", (err, user) => {
    if(!err) {
      const pet =  user.pets.find( (pet) => pet._id == req.params.id);
      
      res.status(200).json({
        pet: pet
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information GET
*  @dest: get total and online users count
*  @security: private
*/
router.get("/count", loginCheck, (req, res) => {
  userModel.count({}, (err, totalCount) => {
    if(!err) {
      res.status(200).json({
        total: totalCount,
        online: listOfUsersSockets.getSocketsCount()
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
*  @dest: send WATER and FOOD items from USER inventory
*  @security: private
*/
router.get("/supplies", loginCheck, (req, res) => {
  userModel.findById(req.session.passport.user, "inventory", (err, user) => {
    if(!err) {
      const responseData = user.inventory.filter( item => {
        return (item.type.substring(0,4) === "FOOD" || item.type.substring(0,5) === "WATER");
      });
      
      res.status(200).json({
        foodAndWaterItems: responseData
      });
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information GET
*  @dest: send the requested user's property
*  @security: private
*/
router.get("/properties/:property", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  userModel.findById(req.session.passport.user,  req.params.property, (err, user) => {
    if(!err) {
      res.status(200).json({
        property: user[req.params.property]
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
      user.inventory = user.inventory.filter( (item, indexOfItem) => {
        if (indexOfItem !== currentPickedKeyPosition && indexOfItem !== currentPickedBoxPosition) {
          return true; 
        }
      });
      
      if (drop.petColors) {
        user.pets.push(drop);
      }
      else {
        user.inventory.push(drop);
      }
      
      user.save();
      res.sendStatus(200);
      
      if (listOfUsersSockets.getSocket(user.id)) {
        listOfUsersSockets.getSocket(user.id).emit("userInformationUpdated");
      }
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: delete used item for FEED from DB and add WATER AND/OR FOOD POINTS into fed up PET 
*  @security: private
*/
router.post("/feed", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { item, pet } = req.body;
  
  userModel.findById(req.session.passport.user, "pets inventory", (err, user) => {
    if (!err) { 
      for (let i = 0; i < user.inventory.length; i++) {
        if (user.inventory[i].type === item.type) {
          user.inventory.splice(i, 1);
          break;
        }
      }
      
      for (let i = 0; i < user.pets.length; i++) {
        if (user.pets[i].id === pet._id) {
          
          user.pets[i].waterPoints += item.waterValue;
          user.pets[i].foodPoints += item.foodValue;
          
          if (user.pets[i].waterPoints > 12) user.pets[i].waterPoints = 12;
          if (user.pets[i].foodPoints > 12) user.pets[i].foodPoints = 12;
          
          break;
        }
      }
      
      user.save();
      res.sendStatus(200);
      
      if (listOfUsersSockets.getSocket(user.id)) {
        listOfUsersSockets.getSocket(user.id).emit("userPetsInformationUpdated");
      }
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: delete dead pet from user.pets in DB
*  @security: private
*/
router.post("/utilize-pet", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { petId } = req.body;
  
  userModel.findById(req.session.passport.user, "pets", (err, user) => {
    if (!err) {
      const indexOfUtilizedPet = user.pets.findIndex(item => item._id == petId);
      
      user.pets.splice(indexOfUtilizedPet, 1);
      
      user.save();
      res.sendStatus(200);
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: add xp point to user
*  @security: private
*/
router.post("/xp", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { xp } = req.body;
  
  userModel.findById(req.session.passport.user, "xp", (err, user) => {
    if (!err) {
      user.xp += xp;
      
      user.save();
      res.sendStatus(200);
      
      if (listOfUsersSockets.getSocket(user.id)) {
        listOfUsersSockets.getSocket(user.id).emit("userInformationUpdated");
      }
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: add coins to user
*  @security: private
*/
router.post("/coins", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { coins } = req.body;
  
  userModel.findById(req.session.passport.user, "coins", (err, user) => {
    if (!err) {
      user.coins += coins;
      
      user.save();
      res.sendStatus(200);
      
      if (listOfUsersSockets.getSocket(user.id)) {
        listOfUsersSockets.getSocket(user.id).emit("userInformationUpdated");
      }
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information PUT
*  @dest: add coins to user
*  @security: private
*/
router.put("/pet/:id/hitpoints", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { updatedPetHitPoints } = req.body;
  const { id } = req.params;
  
  userModel.findById(req.session.passport.user, {pets: {$elemMatch: {_id: id} } } , (err, user) => {
    if (!err) {
      user.pets[0].alive= updatedPetHitPoints !== 0 ? true : false;
      user.pets[0].hitPoints = updatedPetHitPoints;
      
      user.save();
      res.sendStatus(200);
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: check the given pet's ID if that pet is alive
*  @security: private
*/
router.post("/check/pet/alive", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { petID } = req.body;
  
  userModel.findById(req.session.passport.user, "pets", (err, user) => {
    if (!err) {
      let isAlive = false;
      
      for (let i = 0; i < user.pets.length; i++) {
        if ( (user.pets[i]._id.toString() === petID) && 
             (user.pets[i].alive === true) ) {
          isAlive = true;
        }
      }
      
     isAlive === true ? res.sendStatus(200) : res.sendStatus(421);
    }
    else {
      res.sendStatus(409); 
    }
  });
});

/*
*  @information POST
*  @dest: add BOUGHT item into user's inventory in DB
*  @security: private
*/
router.post("/buy/item", loginCheck, urlencodedParser, jsonParser, (req, res) => {
  const { itemName, payWith } = req.body;
  
  userModel.findById(req.session.passport.user, "inventory coins axioms", (err, user) => {
    if (!err) {
      const item = getItemByItsName(itemName);
      
      if (( user[payWith] - item.cost[payWith] ) >= 0) {
        if (user.inventory.length < MAX_CELLS_INVENTORY) {
          user[payWith] = user[payWith] - item.cost[payWith];
          user.inventory.push(item);
          user.save();

          res.sendStatus(200);

          if (listOfUsersSockets.getSocket(user.id)) {
            listOfUsersSockets.getSocket(user.id).emit("userInformationUpdated");
          }
        }
        else {
          res.sendStatus(499);
        }
      }
      else {
        res.sendStatus(498);
      }
    }
    else {
      res.sendStatus(409); 
    }
  });
});

module.exports = router;