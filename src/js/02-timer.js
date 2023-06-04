import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const startBtn = document.querySelector('button[data-start]');
const clockFields = document.querySelectorAll('span.value');
startBtn.disabled = true;
let intervalTimeId = null;

//-----------------start default calendar 
const calendar = flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      //-------------stop default calendar
        
    startBtn.disabled = false;
    const dateNow = (this.config.defaultDate = new Date());
    const past = selectedDates[0] <= dateNow;
    if (past) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
});
let { config: { defaultDate: calendarPresentDate },} = calendar;
//---------------------DEFAULT------------------------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//---------------------^^^DEFAULT^^^------------------------------
function addLeadingZero(value) {
  if (value < 10) {
    return value.padStart(2, '0');
  }
  return value;
}
//-----------------------------------------
function renderArray(arrayOfElements, arrayToRender) {
  arrayOfElements.forEach((el, idx) => {
    const stringifyArray = arrayToRender.map(unit => unit.toString());
    el.textContent = addLeadingZero(stringifyArray[idx]);
  });
  timeEnd(arrayToRender);
}

function getTimeValues(timeInMs) {
  let timeObject = convertMs(timeInMs);
  return Object.values(timeObject);
}

function handleTimer() {
  Notiflix.Notify.success('Go Go Go');  
  calendarPresentDate = new Date();
  startBtn.disabled = true;
  calendar.element.disabled = true;
  let timeToStart =
    calendar.selectedDates[0].getTime() - calendarPresentDate.getTime();
  renderArray(clockFields, getTimeValues(timeToStart));
  intervalTimeId = setInterval(() => {
    renderArray(clockFields, getTimeValues(timeToStart));
    timeToStart -= 1000;
  }, 1000);
}

function timeEnd(timeArray) {
  const finished = timeArray.every(el => el === 0);
  if (finished) {
    clearInterval(intervalTimeId);
    calendar.element.disabled = false;
  }
}
startBtn.addEventListener('click', handleTimer);
