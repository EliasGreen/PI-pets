const randomMathQuestion = require("random-math-question");

const generateRandomMathQuestion = () => {
  return randomMathQuestion.get({
    numberRange: "1-20",
    amountOfNumber: "3-4",
    operations: ["/", "*", "+", "-"],
    nagative: {
        containsNagatives: true,
        negativeChance: "10%"
    },
    exponent: {
        containsExponents: false,
        exponentChance: "10%",
        exponentRange: "1-10"
    }
  });
}

module.exports = generateRandomMathQuestion;