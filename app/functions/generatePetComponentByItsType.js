const Cat = require("../pets/cat");
const Dog = require("../pets/dog");

const petComponents = {
    "Cat": Cat,
    "Dog": Dog
}

const generatePetComponentByItsType = (petType) => {
  return petComponents[petType];
}

module.exports = generatePetComponentByItsType;