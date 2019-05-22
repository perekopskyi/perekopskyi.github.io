let field = document.getElementById('container');
let resultsArray = [];
let counter = 0;
let seconds = 0;
let tens = 0;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let buttonPause = document.getElementById('button-pause');
let Interval;

let colors = ['1', '2', '3', '4', '5', '6', '7', '8']; // создаю массив цветов
let cloneColors = colors.slice(0); // дублирую массив 
let cards = colors.concat(cloneColors); // объединяю массивы


// Функция перемешивания карт
function shuffle(o) {
  for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
shuffle(cards);

// "Раскладываю" карты на поле 
for (var i = 0; i < cards.length; i++) {
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  field.appendChild(card);

  // "переворачиваю" карты по клику 
  card.addEventListener('click', function() {
    if (this.className != 'flipped' && this.className != 'correct'){
        this.className = 'flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval); 
        Interval = setInterval(startTimer, 10);
    }

    // Проверка на совпадение 
    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter ++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }
    }
  });
};


// Функция проверки карты
let check = function(className) {
  let flipped = document.getElementsByClassName("flipped");
  setTimeout(function() {
    for (let i = (flipped.length - 1); i >= 0; i--) {
      flipped[i].className = className;
    }
  },200); // timeout для отображения каждой второй карты
}

// Реализовал кнопку паузы
buttonPause.onclick = function() {
    clearInterval(Interval); //прерывает запланированное выполнение кода
}

// Функция таймера
function startTimer() {
  tens++;
  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }
  if (tens > 9){
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }
}

// Проверка на окончание игры
let win = function() {
  if (counter === 8) {
    clearInterval(Interval);
    alert("Вы выиграли! Затраченное время: " + seconds + '.' + tens);
  }
}