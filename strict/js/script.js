let name = document.querySelector(name);
let nameInput = document.querySelectorAll("input")[0];

nameInput.addEventListener('input', function () {
  name.innerHTML = `Моё имя: ${nameInput.value}`;
});