// Selecting elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

function updateDisplay(value) {
    display.textContent = value;
}

// Clearing the calculator
function clearCalculator() {
    currentInput = '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
    updateDisplay('0');
}

// Handling button clicks
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            handleNumber(value);
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '←') {
            handleBackspace();
        }
    });
});

// Handling number inputs
function handleNumber(number) {
    if (currentInput.length >= 10) return; // Limit input length
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals

    currentInput += number;
    updateDisplay(currentInput);
}

// Handling operators
function handleOperator(op) {
    if (operator !== null) {
        handleEquals();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}

// Handling equals
function handleEquals() {
    if (operator === null || currentInput === '') return;

    secondOperand = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                updateDisplay('Error');
                return;
            }
            result = firstOperand / secondOperand;
            break;
    }

    updateDisplay(result.toString().substring(0, 10)); // Display up to 10 characters
    firstOperand = result;
    operator = null;
    currentInput = '';
}

// Handling backspace
function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

// Initialize calculator
clearCalculator();