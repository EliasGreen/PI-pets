const userModel = require("../mongoDBmodels/userModel");

function CheckerOfPets() {
  this.error = null;
}


async function checkLastTimeofGettingWater(lastTimeofGettingWater) {
  const diff = (Date.now()).valueOf() - lastTimeofGettingWater.valueOf();
  const diffInHours = Math.trunc(diff/1000/60/60);
  
  return diffInHours;
};

async function checkLastTimeofGettingFood(lastTimeofGettingFood) {
  const diff = (Date.now()).valueOf() - lastTimeofGettingFood.valueOf();
  const diffInHours = Math.trunc(diff/1000/60/60);
  
  return diffInHours;
};

async function configurePetProperties(pet) {
  const waterDiffInHours = await checkLastTimeofGettingWater(pet.lastTimeofGettingWater);
  if (waterDiffInHours > 0) {
    pet.lastTimeofGettingWater = Date.now();
    pet.waterPoints -= waterDiffInHours;
    
    if (pet.waterPoints < 0) {
      pet.alive = false;
      pet.waterPoints = 0;
    }
    
    try {
      const updatedUser = await userModel.findOne({ "pets._id": pet.id}, "pets").exec();
      const indexOfCurrentPet = updatedUser.pets.findIndex(item => item._id == pet.id);
      updatedUser.pets[indexOfCurrentPet].waterPoints = pet.waterPoints;
      updatedUser.pets[indexOfCurrentPet].lastTimeofGettingWater = pet.lastTimeofGettingWater;
      updatedUser.pets[indexOfCurrentPet].alive = pet.alive;

      updatedUser.save();
    } 
    catch (e) {
      print(e);
    }
  }
  
  const foodDiffInHours = await checkLastTimeofGettingFood(pet.lastTimeofGettingFood);
  if (foodDiffInHours > 0) {
    pet.lastTimeofGettingFood = Date.now();
    pet.foodPoints -= foodDiffInHours;

    if (pet.foodPoints < 0) {
      pet.alive = false;
      pet.foodPoints = 0;
    }
    
    try {
      const updatedUser = await userModel.findOne({ "pets._id": pet.id}, "pets").exec();
      const indexOfCurrentPet = updatedUser.pets.findIndex(item => item._id == pet.id);
      updatedUser.pets[indexOfCurrentPet].foodPoints = pet.foodPoints;
      updatedUser.pets[indexOfCurrentPet].lastTimeofGettingFood = pet.lastTimeofGettingFood;
      updatedUser.pets[indexOfCurrentPet].alive = pet.alive;

      updatedUser.save();
    } 
    catch (error) {
      this.error = error;
    }
  }
};


CheckerOfPets.prototype.start = async function() {
  while (true) {
    if (!this.error) {
      try {
        let usersWithAlivePets = await userModel.find({ "pets.alive": true }, "pets").exec();
        
        for (let user of usersWithAlivePets) {
          for (let pet of user.pets) {
            await configurePetProperties(pet);
          }
        }
      }
      catch (error) {
        this.error = error;
      } 
    }
  }
};

const checker = new CheckerOfPets();

module.exports = checker;