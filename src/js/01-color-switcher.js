const body = document.body;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  changeBgColor();
  timerId = setInterval(changeBgColor, 1000);
    stopBtn.disabled = false;
    startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
});