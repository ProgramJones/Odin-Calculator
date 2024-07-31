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

let divideNode = document.querySelector("#divide");
let multiplyNode = document.querySelector("#multiply");
let subtractNode = document.querySelector("#subtract");
let addNode = document.querySelector("#add");

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

    // Removes the background-color and resets display text
    // if operator was pressed last
    if (operatorPressed) {
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

function addDecimal() {
    if (display.textContent.includes(".")) {

    } else {
        display.appendChild(document.createTextNode("."));
    }
}

function clearText() {
    display.textContent = "0";

    firstNumber = null;
    secondNumber = null;
    operator = null;
}

function equalsFunction() {
    if (operator === null) {

    } else {
        secondNumber = +display.textContent;

        // Round answer to two decimal places
        display.textContent = Math.round(operate(firstNumber, secondNumber, operator) * 100) / 100;

        secondNumber = null;
        operator = null;
    }
}

function percentFunction() {
    display.textContent = +display.textContent / 100;
}

numbers.forEach((number) => {
    number.addEventListener("click", appendToDisplay);
});

document.addEventListener("keydown", (e) => {

    // Listens for numberic keyboard input
    if (/\d/.test(e.key)) {
        // Removes the background-color and resets display text
        // if operator was pressed last
        if (operatorPressed) {
            display.textContent = "0";

            operatorPressed.classList.remove("operatorPressed");
            operatorPressed = null;
        }


        if (+display.textContent === 0) {
            display.textContent = "";
        }

        let key = document.createTextNode(e.key);
        display.appendChild(key);
    } else if (/[.]/.test(e.key)) {
        addDecimal();
    } else if (/[c]/.test(e.key)) {
        clearText();
    } else if (e.key.includes("=") || e.key.includes("Enter")) {
        equalsFunction();
    } else if (/[+]/.test(e.key)) {
        firstNumber = +display.textContent;
        operatorPressed = addNode;
        operatorPressed.setAttribute("class", "operatorPressed");
        operator = addNode.textContent;
    } else if (e.key.includes("-")) {
        firstNumber = +display.textContent;
        operatorPressed = subtractNode;
        operatorPressed.setAttribute("class", "operatorPressed");
        operator = subtractNode.textContent;
    }
    else if (/[*]/.test(e.key)) {
        firstNumber = +display.textContent;
        operatorPressed = multiplyNode;
        operatorPressed.setAttribute("class", "operatorPressed");
        operator = multiplyNode.textContent;
    } else if (/[/]/.test(e.key)) {
        firstNumber = +display.textContent;
        operatorPressed = divideNode;
        operatorPressed.setAttribute("class", "operatorPressed");
        operator = divideNode.textContent;
    } else if (/[%]/.test(e.key)) {
        percentFunction();
    } else {
    }

});

operations.forEach((operation) => {

    operation.addEventListener("click", () => {
        firstNumber = +display.textContent;
        operator = operation.textContent;

        operatorPressed = document.querySelector(`#${operation.getAttribute("id")}`);
        operatorPressed.setAttribute("class", "operatorPressed");
    })
});

clear.addEventListener("click", clearText);

opposite.addEventListener("click", () => {
    if (+display.textContent < 0) {
        display.textContent = +display.textContent - (+display.textContent * 2);
    } else {
        display.textContent = +display.textContent - (+display.textContent * 2);
    }
});

percent.addEventListener("click", percentFunction);
decimal.addEventListener("click", addDecimal);
equals.addEventListener("click", equalsFunction);
