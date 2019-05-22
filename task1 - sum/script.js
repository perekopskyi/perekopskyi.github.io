let input = document.querySelectorAll('input'),
    a, b, result;

function sum(a, b) {
  a = +input[0].value; 
  b = +input[1].value;
  result = (a * 10 + b * 10) / 10;
  return result;
}

input[2].addEventListener('click', () => {
  alert(sum());
});

