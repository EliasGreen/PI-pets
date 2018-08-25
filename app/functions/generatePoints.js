const getRandomInt = (min, max) => {
  	return Math.floor(Math.random() * (max - min)) + min;
}

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const generateRandomLetters = () => {
  let randomLetters = [];
  
  while (randomLetters.length !== 3) {
    let letter = alphabet[getRandomInt(0, alphabet.length + 1)];
    
    if (!randomLetters.includes(letter)) {
      randomLetters.push(letter);
    }
  }
  
  return randomLetters;
}

const generatePoints = () => {
  const randomLetters = generateRandomLetters();
  return ({
    top: randomLetters[0],
    middle: randomLetters[1],
    bottom: randomLetters[2]
  });
}

module.exports = generatePoints;