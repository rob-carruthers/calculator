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

// Set up operator keys
for (const operator of ["Add", "Subtract", "Multiply", "Divide"] ) {
    document.querySelector("#button" + operator).addEventListener(
        'click', (e) => {
            // Check if this is the first operation or one of a chain
            if (currentOperator === "" ) {
                firstOperand = calculatorDisplayValue;
                calculatorDisplayValue = 0;
            }
            // If part of a chain, calculate the first result and then
            // make this the result the first operand of the next
            // operation.
            else {
                const result = operate(currentOperator, firstOperand, calculatorDisplayValue);
                firstOperand = result;
                calculatorDisplay.textContent = result;
                // reset the display value for when a new number is typed.
                calculatorDisplayValue = 0;
            }
            // Set the current operator from the content of
            // the button which has been clicked
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