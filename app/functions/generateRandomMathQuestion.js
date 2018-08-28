const randomMathQuestion = require("random-math-question");

const generateRandomMathQuestion = () => {
  const mathQuestion = randomMathQuestion.get({
    numberRange: "1-10",
    amountOfNumber: "4-5",
    operations: ["/", "*", "+", "-"],
    nagative: {
        containsNagatives: true,
        negativeChance: "10%"
    }
  });
  
  if (mathQuestion.answer == Math.trunc(mathQuestion.answer)) {
    return mathQuestion;
  }
  else {
    return generateRandomMathQuestion();
  }
}

module.exports = generateRandomMathQuestion;