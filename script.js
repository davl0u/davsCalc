const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const resultInput = document.getElementById('result');
const themeToggle = document.getElementById('theme-toggle');
const parenthesesButtons = document.querySelectorAll('.parentheses');
const historyList = document.getElementById('history-list');
const clearHistoryButton = document.getElementById('clear-history');

let shouldResetDisplay = false;

function addToHistory(expression, result) {
  const listItem = document.createElement('li');
  listItem.textContent = `${expression} = ${result}`;
  historyList.appendChild(listItem);
}

function clearHistory() {
  historyList.innerHTML = '';
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (shouldResetDisplay) {
      resultInput.value = '';
      shouldResetDisplay = false;
    }
    resultInput.value += button.value;
    button.blur();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    resultInput.value += button.value;
    shouldResetDisplay = false;
    button.blur();
  });
});

parenthesesButtons.forEach(button => {
  button.addEventListener('click', () => {
    resultInput.value += button.value;
    button.blur();
  });
});

equalsButton.addEventListener('click', () => {
  try {
    const expression = resultInput.value;
    const result = eval(expression);
    resultInput.value = result;
    addToHistory(expression, result);
  } catch (error) {
    alert('Error in expression! Please check if it is correct.');
  }
  equalsButton.blur();
});

clearButton.addEventListener('click', () => {
  resultInput.value = '';
  clearButton.blur();
});

clearHistoryButton.addEventListener('click', () => {
  clearHistory();
});

document.addEventListener('keydown', event => {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '%', '(', ')', '.'].includes(key)) {
    resultInput.value += key;
  }

  if (key === 'Enter') {
    try {
      const expression = resultInput.value;
      const result = eval(expression);
      resultInput.value = result;
      addToHistory(expression, result);
    } catch (error) {
      alert('Error in expression! Please check if it is correct.');
    }
  }

  if (key === 'Backspace') {
    resultInput.value = resultInput.value.slice(0, -1);
  }

  if (event.target.tagName.toLowerCase() === 'button') {
    event.target.blur();
  }
});

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');

  const isLightTheme = body.classList.contains('light-theme');

  if (isLightTheme) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeIcon.src = 'images/moon.png';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeIcon.src = 'images/sun.png';
  }
}
