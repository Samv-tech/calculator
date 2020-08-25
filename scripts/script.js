// Math Logic

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR"
    }
}

// Variables

let displayValue = "";
let operator = "";
let temp = "";

const prevOperation = document.querySelector(".prevOperation");
const currentOperation = document.querySelector(".currentOperation");

const numBtn = document.querySelectorAll(".num-btn");
const operatorButton = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");

// Functions

const ifDecimal = () => displayValue.includes(".") ? decimalButton.disabled = true : 
                                                     decimalButton.disabled = false;

function operatorSelected() {
    temp = displayValue;
    displayValue = "";
    currentOperation.innerHTML = 0;
}

function history() {
    prevOperation.innerHTML = `${temp} ${operator}`;
}

function clearData() {
    displayValue = "";
    operator = "";
    temp = "";

    prevOperation.innerHTML = "";
    currentOperation.innerHTML = "0";

    decimalButton.disabled = false;
}

// Logic

numBtn.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperation.innerHTML == 0) currentOperation.innerHTML = "";
        displayValue = currentOperation.innerHTML += button.textContent;
    })
});

decimalButton.addEventListener("click", ifDecimal);

operatorButton.forEach(button => {
    button.addEventListener("click", () => {
        if (temp.length !== 0) {
            temp = operate(operator, Number(temp), Number(displayValue))
        }
        operator = button.textContent;
        operatorSelected();
        ifDecimal();
        history();
    })
});

equalsButton.addEventListener("click", () => {
    displayValue = currentOperation.innerHTML = operate(operator, Number(temp), Number(displayValue));
    if (displayValue === "ERROR") {
        clearData();
    } else if (displayValue === Infinity) {
        currentOperation.innerHTML = "lol no";
        setTimeout(clearData, 500);
    }
    history();
})

clearButton.addEventListener("click", clearData);

