// Operate function for all arithmetic operations

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return a / b;
            break;
        default:
            return "Error"
    }
}

function pressOperatorKey(e) {
    debugger;
    backspaceEnabled = false;
    // Check if this is the first operation or one of a chain
    if (currentOperator === "" ) {
        firstOperand = calculatorDisplayValue;
        calculatorDisplayDecimals = 0;
        calculatorDisplayValue = 0;
    }
    // If part of a chain, calculate the first result and then
    // make this the result the first operand of the next
    // operation.
    else {
        const result = operate(currentOperator, firstOperand, calculatorDisplayValue);
        firstOperand = result;
        calculatorDisplay.textContent = Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
        // reset the display value for when a new number is typed.
        calculatorDisplayDecimals = 0;
        calculatorDisplayValue = 0;
    }
    // Set the current operator from the content of
    // the button which has been clicked
    currentOperator = e.target.textContent;

};

// Initial setup
let calculatorDisplayValue = 0;
let firstOperand = 0;
let currentOperator = "";
let backspaceEnabled = false;
const precision = 14;
let calculatorDisplayDecimals = 0;
const calculatorDisplay = document.querySelector(".calculatorDisplay")

function reset() {
    calculatorDisplayValue = 0;
    firstOperand = 0;
    currentOperator = "";
    calculatorDisplayDecimals = 0;
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
    let newValue = 0;

    // If a decimal number, handle this gracefully
    if (calculatorDisplayDecimals > 0) {
        // First update the value so that typing more numbers adds decimals on the end
        newValue = calculatorDisplayValue + (n / Math.pow(10, calculatorDisplayDecimals))
        // Use rounding to avoid floating-point rounding errors cluttering the display
        newValue = Math.round(newValue * Math.pow(10, calculatorDisplayDecimals)) / Math.pow(10, calculatorDisplayDecimals)
        // Store our floating-point position
        calculatorDisplayDecimals++;
    }
    else {
        // If no decimals, add a digit on the end as normal.
        newValue = (calculatorDisplayValue * 10) + n;
    }
    backspaceEnabled = true;
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

// Set up operator keys
for (const operator of ["Add", "Subtract", "Multiply", "Divide"] ) {
    document.querySelector("#button" + operator).addEventListener(
        'click', pressOperatorKey);
};

document.querySelector("#buttonEquals").addEventListener(
    'click', () => {
        if (!(currentOperator === "")) {
            const result = operate(currentOperator, firstOperand, calculatorDisplayValue);
            calculatorDisplayValue = result;
            calculatorDisplay.textContent = Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
            currentOperator = "";
            backspaceEnabled = false;
        }
    }
)

document.querySelector("#buttonDecimal").addEventListener(
    'click', () => {
        // If no decimal places at this point, add one
        if (calculatorDisplayDecimals < 1) {
            calculatorDisplayDecimals = 1;
            calculatorDisplay.textContent += "."
        }
    }
);

document.querySelector("#buttonBackspace").addEventListener(
    'click', () => {
        // Remove last digit of display through string manipulation
        // (A little dirty)
        if (!(calculatorDisplay === 0) && backspaceEnabled) {
            let numString = calculatorDisplay.textContent;
            // Handle a trailing decimal point if entered
            if (!(numString.slice(-1) == ".")) {
                numString = numString.slice(0, -1);
            };

            if (calculatorDisplayDecimals > 0) {
                calculatorDisplayDecimals -= 1;
            };

            calculatorDisplayValue = Number(numString);
            calculatorDisplay.textContent = numString;
        }
    }
);
