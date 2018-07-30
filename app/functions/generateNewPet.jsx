const rarities = [ { label: "Poor", coefficient: 0.8 },
                   { label: "Common", coefficient: 1 },
                   { label: "Uncommon", coefficient: 1.1 },
                   { label: "Rare", coefficient: 1.2 },
                   { label: "Epic", coefficient: 1.3 },
                   { label: "Legendary", coefficient: 1.4 },
                   { label: "Artifact", coefficient: 1.5 } ];
const sexes = [ "Male", "Female" ];
const specializations = [ "Fighter", "Coinser", "Model", "LongLiver", "HungryBullet", "SpeedRunner", "Wild"];
const petTypes = [ "Cat" , "Dog" ];

const chooseRandomItemFromArray = (array) => {
  if (array != rarities) {
    return array[Math.floor(Math.random() * ((array.length-1) - 0 + 1)) + 0];
  }
  else {
    let randomIndex  = Math.random() > 0.2 ? (Math.floor(Math.random() * (2 - 0 + 1)) + 0) : (Math.floor(Math.random() * ((array.length-1) - 0 + 1)) + 0);
    return array[randomIndex];
  }
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

const generateNewPet = (nickname) => {
  const newGeneratedPerColorsInRGB = generateRandomPetColorInRGB();
  
  const pet = {
    type: chooseRandomItemFromArray(petTypes),
    petColors: newGeneratedPerColorsInRGB,
    nickname: nickname,
    specialist: chooseRandomItemFromArray(specializations),
    sex: chooseRandomItemFromArray(sexes),
    rarity: chooseRandomItemFromArray(rarities),
    hitPoints: 100
  };

  pet.attack = Math.round((Math.floor(Math.random() * 66) + 5) * pet.rarity.coefficient);
  pet.defense = Math.round((Math.floor(Math.random() * 13) + 1) * pet.rarity.coefficient);
  
  return pet;
}


module.exports = generateNewPet;