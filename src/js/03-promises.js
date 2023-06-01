import Notiflix from 'notiflix';
const form = document.querySelector('.form');
// const submitBtn = document.querySelector('button[data-start]');

function InputValues() {
  const {
    elements: {
      delay: { value: delayValue },
      step: { value: stepValue },
      amount: { value: amountValue },
    },
  } = form;
  return {
    delay: +delayValue,
    step: +stepValue,
    amount: +amountValue,
  };
}

function createPromise(position, delay) {
  const chance = Math.random() > 0.3;
  const data = {
    position,
    delay,
  };
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      chance ? fulfill(data) : reject(data);
    }, delay);
  });
}

form.addEventListener('submit', e => {
  // submitBtn.disabled = true;
  e.preventDefault();
  const input = InputValues();
  for (let i = 1; i <= input.amount; i++) {    
    createPromise(i, input.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    input.delay += input.step;
    // if (i === input.amount) {
    //   // submitBtn.disabled = true    
    // }
  }
});
