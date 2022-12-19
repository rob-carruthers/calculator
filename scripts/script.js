// Arithmetic functions with two operators

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        default:
            return "Operator not recognised."
    }
}

// Initial setup
let calculatorDisplayValue = 0;
let firstOperand = 0;
let currentOperator = "";
const calculatorDisplay = document.querySelector(".calculatorDisplay")

function reset() {
    calculatorDisplayValue = 0;
    firstOperand = 0;
    currentOperator = "";
    calculatorDisplay.textContent = calculatorDisplayValue;
}

reset()

// Set up clear button to reset when clicked
document.querySelector("#buttonClear").addEventListener(
    'click',
    () => reset()
);

// Function for updating calculatorDisplayValue and the display itself
function sendNumeralToDisplay(n) {
    let newValue = (calculatorDisplayValue * 10) + n;
    calculatorDisplayValue = newValue;
    calculatorDisplay.textContent = calculatorDisplayValue;
}

// Set up listeners for numeric keys
for (let i = 0; i < 10; i++) {
    document.querySelector("#button" + i).addEventListener(
        'click', (e) => {
            sendNumeralToDisplay(parseInt(e.target.textContent)
        )
    });
}

for (const operator of ["Add", "Subtract", "Multiply", "Divide"] ) {
    document.querySelector("#button" + operator).addEventListener(
        'click', (e) => {
            firstOperand = calculatorDisplayValue;
            calculatorDisplayValue = 0;
            currentOperator = e.target.textContent;
        }
    );
};

document.querySelector("#buttonEquals").addEventListener(
    'click', () => {
        const result = operate(currentOperator, firstOperand, calculatorDisplayValue);
        calculatorDisplayValue = result;
        calculatorDisplay.textContent = calculatorDisplayValue;
    }
)