const randomMathQuestion = require("random-math-question");

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const generateRandomMathQuestion = () => {
//   const mathQuestion = randomMathQuestion.get({
//     numberRange: "1-10",
//     amountOfNumber: "4-5",
//     operations: ["/", "*", "+", "-"],
//     nagative: {
//         containsNagatives: true,
//         negativeChance: "10%"
//     }
//   });
  
//   if (mathQuestion.answer == Math.trunc(mathQuestion.answer)) {
//     return mathQuestion;
//   }
//   else {
//     return generateRandomMathQuestion();
//   }
// }

const generateRandomMathQuestion = () => {
  const numberRange = "1-10";
  const amountOfNumber = "4-5";
  const operations =  ["/", "*", "+", "-"];
  
  const firstNumber = randomInteger(parseInt(numberRange.split("-")[0], 10), parseInt(numberRange.split("-")[1], 10));
  
  let generatingMathQuestion = firstNumber;
  
  
  let iterationsCount = randomInteger(parseInt(amountOfNumber.split("-")[0], 10), parseInt(amountOfNumber.split("-")[1], 10)) - 1;
  
  while (iterationsCount > 0) {
    iterationsCount--;
    const nextNumber = randomInteger(parseInt(numberRange.split("-")[0], 10), parseInt(numberRange.split("-")[1], 10));
    
    switch (operations[randomInteger(0, 3)]) {
      case "/":
        generatingMathQuestion += ` / ${nextNumber}`;
        break;
      case "*":
        generatingMathQuestion += ` * ${nextNumber}`;
        break;
      case "+":
        generatingMathQuestion += ` + ${nextNumber}`;
        break;
      case "-":
        generatingMathQuestion += ` - ${nextNumber}`;
        break;
        
      default:
        throw new Error("unknown operation sign");
    }
  }
  
    
  const MathQuestion = {
    question: generatingMathQuestion,
    answer: eval(generatingMathQuestion) 
  }
  
  return MathQuestion.answer.toString().indexOf(".") === -1
  ? MathQuestion
  : generateRandomMathQuestion();
  
}

module.exports = generateRandomMathQuestion;