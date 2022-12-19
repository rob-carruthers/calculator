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
const calculatorDisplay = document.querySelector(".calculatorDisplay")
let calculatorDisplayValue = 0;
calculatorDisplay.textContent = calculatorDisplayValue;

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