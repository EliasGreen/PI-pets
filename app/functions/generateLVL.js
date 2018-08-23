const getRandomInt = (min, max) => {
  	return Math.floor(Math.random() * (max - min)) + min;
}

const generateLVL = max => {
  return getRandomInt(0, (max+1))
}

module.exports = generateLVL;