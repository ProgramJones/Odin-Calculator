let firstNumber = null;
let secondNumber = null;
let operator = null;
let operatorPressed = null;

let display = document.querySelector("#display");
let clear = document.querySelector("#clear");
let opposite = document.querySelector("#opposite");
let decimal = document.querySelector("#decimal")
let percent = document.querySelector("#percent");
let equals = document.querySelector("#equals");

let numbers = document.querySelectorAll(".number");
let operations = document.querySelectorAll(".operation");

function add(addFirst, addSecond) {
    return addFirst + addSecond;
}

function subtract(subtractFirst, subtractSecond) {
    return subtractFirst - subtractSecond;
}

function multiply(multiplyFirst, multiplySecond) {
    return multiplyFirst * multiplySecond;
}

function divide(divideFirst, divideSecond) {
    return divideFirst / divideSecond;
}

function operate(operateOnFirst, operateOnSecond, operator) {

    if (operator === "+") {
        return add(operateOnFirst, operateOnSecond);
    } else if (operator === "-") {
        return subtract(operateOnFirst, operateOnSecond);
    } else if (operator === "*") {
        return multiply(operateOnFirst, operateOnSecond);
    } else if (operator === "/") {
        return divide(operateOnFirst, operateOnSecond);
    }
}

function appendToDisplay() {

    if (operatorPressed) {
        console.log(operatorPressed);
        display.textContent = "0";

        operatorPressed.classList.remove("operatorPressed");
        operatorPressed = null;
    }


    if (+display.textContent === 0) {
        display.textContent = "";
    }

    let number = document.createTextNode(this.textContent);
    display.appendChild(number);
}

numbers.forEach((number) => {
    number.addEventListener("click", appendToDisplay);
});

operations.forEach((operation) => {

    operation.addEventListener("click", () => {
        firstNumber = +display.textContent;
        operator = operation.textContent;

        operatorPressed = document.querySelector(`#${operation.getAttribute("id")}`);
        operatorPressed.setAttribute("class", "operatorPressed");
    })
});

clear.addEventListener("click", () => {
    display.textContent = "0";

    console.log(operatorPressed);
});

opposite.addEventListener("click", () => {
    console.log(+display.textContent)
    if (+display.textContent < 0) {
        display.textContent = +display.textContent - (+display.textContent * 2);
    } else {
        display.textContent = +display.textContent - (+display.textContent * 2);
    }
});

percent.addEventListener("click", () => {
    display.textContent = +display.textContent / 100;
});

decimal.addEventListener("click", () => {
    if (display.textContent.includes(".")) {

    } else {
        display.appendChild(document.createTextNode("."));
    }
});

equals.addEventListener("click", () => {

    if (operator === null) {

    } else {
        secondNumber = +display.textContent;

        // Round answer to two decimal places
        display.textContent = Math.round(operate(firstNumber, secondNumber, operator) * 100) / 100;

        secondNumber = null;
        operator = null;
    }

});
