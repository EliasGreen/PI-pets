const rarities = [ "Poor",
                 "Common",
                 "Uncommon ",
                 "Rare",
                 "Epic",
                 "Legendary",
                 "Artifact",
                 "Heirloom" ];

const sexes = [ "Male", "Female" ];

const specializations = [ "Fighter", "Coinser", "Model", "LongLiver", "HungryBullet", "SpeedRunner", "Wild"]

const chooseRandomItemFromArray = (array) => {
  return array[Math.floor(Math.random() * ((array.length-1) - 0 + 1)) + 0];
}

const generateRandomPetColorInRGB = () => {
  return(
    {
      top: `rgb(${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40})`,
      center: `rgb(${Math.floor(Math.random() * (200 - 40 + 1)) + 60},${Math.floor(Math.random() * (200 - 40 + 1)) + 60},${Math.floor(Math.random() * (200 - 40 + 1)) + 60})`,
      down: `rgb(${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40},${Math.floor(Math.random() * (255 - 40 + 1)) + 40})`,
      details: `rgb(${Math.floor(Math.random() * (255 - 40 + 1)) + 10},${Math.floor(Math.random() * (255 - 40 + 1)) + 10},${Math.floor(Math.random() * (255 - 40 + 1)) + 10})`
    } 
  );
}

const generateNewPet = (petType, nickname) => {
  const newGeneratedPerColorsInRGB = generateRandomPetColorInRGB();
  const pet = {
    type: petType,
    petColors: newGeneratedPerColorsInRGB,
    nickname: nickname,
    
  };
  // specialist: String,
  // sex: String,
  // rarity: String,
  // hitPoints:  { type: Number, min: 0, max: 100, default: 100},
  // attack: { type: Number, min: 0, max: 100, default: 5},
  // defense: { type: Number, min: 0, max: 20, default: 1}
}


module.exports = generateNewPet;