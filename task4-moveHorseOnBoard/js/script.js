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
      results.push(resultItem);
    }
  });
  return results;
}

// Обозначаю массив всех ячеек поля
let idExcel = document.querySelectorAll('.excel');

idExcel.forEach.call(idExcel, function (el) {
  el.addEventListener('click', function addClass() {
    let id = this.id;
    let elem = document.getElementById(id);
    console.log(id, elem); // работает. по клику определяет id

    //Очищаю классы с предыдущих ходов
    idExcel.forEach(function (el) {
      if (el.classList.contains('class-in')) {
        el.classList.remove('class-in');
      } else if (el.classList.contains('class-out')) {
        el.classList.remove('class-out');
      }
    });

    elem.classList.add('class-in'); //присваиваю синий цвет нажатой ячейке

    // Поиск результирующих ходов и присваивание класса
    let indexOfInput = []
    indexOfInput[0] = scaleX.indexOf(id[0])
    indexOfInput[1] = scaleY.indexOf(+id[1])
    let allResults = getAllVariations(indexOfInput);
    allResults.forEach(action => {
      let elem = document.getElementById(action);
      elem.classList.add('class-out');
    });
  });
});