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
    backspaceEnabled = false;
    // Check if this is the first operation or one of a chain
    if (currentOperator === "" ) {
        firstOperand = outputDisplayValue;
        outputDisplayDecimals = 0;
        outputDisplayValue = 0;
    }
    // If part of a chain, calculate the first result and then
    // make this the result the first operand of the next
    // operation.
    else {
        const result = operate(currentOperator, firstOperand, outputDisplayValue);
        firstOperand = result;
        outputDisplay.textContent = Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
        // reset the display value for when a new number is typed.
        outputDisplayDecimals = 0;
        outputDisplayValue = 0;
    }
    // Set the current operator from the content of
    // the button which has been clicked
    currentOperator = e.target.textContent;
    operandsDisplay.textContent = firstOperand.toString() + " " + currentOperator;

};

// Initial setup
let outputDisplayValue = 0;
let firstOperand = 0;
let currentOperator = "";
let backspaceEnabled = false;
const precision = 14;
let outputDisplayDecimals = 0;
const outputDisplay = document.querySelector("#outputDisplay");
const operandsDisplay = document.querySelector("#operandsDisplay");

function reset() {
    outputDisplayValue = 0;
    firstOperand = 0;
    currentOperator = "";
    outputDisplayDecimals = 0;
    outputDisplay.textContent = outputDisplayValue;
    operandsDisplay.textContent = "";
}

reset()

// Set up clear button to reset when clicked
document.querySelector("#buttonClear").addEventListener(
    'click',
    () => reset()
);

// Function for updating outputDisplayValue and the display itself
function sendNumeralToDisplay(n) {
    let newValue = 0;

    // If a decimal number, handle this gracefully
    if (outputDisplayDecimals > 0) {
        // First update the value so that typing more numbers adds decimals on the end
        newValue = outputDisplayValue + (n / Math.pow(10, outputDisplayDecimals))
        // Use rounding to avoid floating-point rounding errors cluttering the display
        newValue = Math.round(newValue * Math.pow(10, outputDisplayDecimals)) / Math.pow(10, outputDisplayDecimals)
        // Store our floating-point position
        outputDisplayDecimals++;
    }
    else {
        // If no decimals, add a digit on the end as normal.
        newValue = (outputDisplayValue * 10) + n;
    }
    backspaceEnabled = true;
    outputDisplayValue = newValue;
    outputDisplay.textContent = outputDisplayValue;
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
            const result = operate(currentOperator, firstOperand, outputDisplayValue);
            operandsDisplay.textContent = firstOperand.toString() + " " + currentOperator + " " + outputDisplayValue.toString() + " = ";
            outputDisplayValue = result;
            outputDisplay.textContent = Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
            

            currentOperator = "";
            backspaceEnabled = false;
        
        }
    }
)

document.querySelector("#buttonDecimal").addEventListener(
    'click', () => {
        // If no decimal places at this point, add one
        if (outputDisplayDecimals < 1) {
            outputDisplayDecimals = 1;
            outputDisplay.textContent += "."
        }
    }
);

document.querySelector("#buttonBackspace").addEventListener(
    'click', () => {
        // Remove last digit of display through string manipulation
        // (A little dirty)
        if (!(outputDisplay === 0) && backspaceEnabled) {
            let numString = outputDisplay.textContent;

            numString = numString.slice(0, -1);

            if (outputDisplayDecimals > 0) {
                outputDisplayDecimals -= 1;
            };

            outputDisplayValue = Number(numString);
            outputDisplay.textContent = numString;
        }
    }
);
