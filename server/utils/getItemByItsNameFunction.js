const getItemByItsName = (itemName) => {
  let item = {};
  
  switch (itemName) {
    case "KeyPI":
      item = { 
        type: "KeyPI",
        rarity: "Legendary",
        for: "BoxPI",
        cost: {
          coins: 1000,
          axioms: 10
        }
      };
      break;
      
    case "BoxPI":
      item = { 
        type: "BoxPI",
        rarity: "Legendary",
        openTool: "KeyPI",
        output: "Random PIpet",
        cost: {
          coins: 500,
          axioms: 8
        }
      };
      break;
      
    case "WATER__bottle":
      item = {
        type: "WATER__bottle",
        cost: {
          coins: 26,
          axioms: 1
        },
        waterValue: 4,
        foodValue: 0
      };
      break;
      
    case "FOOD__can":
      item = {
        type: "FOOD__can",
        cost: {
          coins: 37,
          axioms: 1
        },
        waterValue: 1,
        foodValue: 3
      };
      break;
      
    default:
      throw new Error("unexpecred itemName");
  }
  
  return item;
}

module.exports = getItemByItsName;