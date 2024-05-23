// src/utils.js
export function getRandomTravelItems(list, count) {
    const result = [];
    const usedNames = new Set();
  
    while (result.length < count && list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      const selectedItem = list[randomIndex];
  
      if (!usedNames.has(selectedItem.name)) {
        result.push(selectedItem);
        usedNames.add(selectedItem.name);
      }
  
      list.splice(randomIndex, 1);
    }
  
    return result;
  }
  