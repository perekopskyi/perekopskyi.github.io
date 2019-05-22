// Обозначаю input и button   
let input = document.querySelector('#input-1'),
    button = document.querySelector('#button');
// Обозначаю массивы шкал и вариантов движения коня
const scaleX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const scaleY = [1, 2, 3, 4, 5, 6, 7, 8];
const allPosibleActions = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2]
];

// Функция для поиска возможных вариантов хода
function getAllVariations(indexes) {
  var results = [];
  allPosibleActions.forEach(function (action) {
    let newColumn = indexes[0] + action[0];
    let newElem = indexes[1] + action[1];
    // Если элемент выходит за края поля - пропускаем его
    if (newColumn < 0 || newElem < 0 || newColumn > 7 || newElem > 7) {
        return;
        }
    let newItemColumn = scaleX[newColumn];
    let newItemPosition = scaleY[newElem];
    if (newItemColumn !== -1 || newItemPosition !== -1) {
      let resultItem = newItemColumn.toString() + newItemPosition.toString();
      results.push(resultItem.toUpperCase());
    }
  });
  return results;
}

// Функция показа сообщения
function showAlertWith(message) {
  alert(message);
}

// Функция определения координаты значения input в массиве шахматного поля
function getIndexesOfEnteredTextIfExist() {
  let text = input.value.toLowerCase();
  let columnIndex = scaleX.indexOf(text[0]);
  let positionIndex = scaleY.indexOf(+text[1]);
  return [columnIndex, positionIndex];
}

//Вызвываю функцию показа результата при клике на кнопку
button.addEventListener('click', () => {
  let indexes = getIndexesOfEnteredTextIfExist();
  if (indexes[0] === -1 || indexes[1] === -1) {
      showAlertWith("Error, input data out of range");
  } else {
    let variations = getAllVariations(indexes);
    showAlertWith(variations.join(", "));
  }
});