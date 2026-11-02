const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "0";
let firstNumber = null;
let operator = null;
let startNewNumber = false;

function calculate() {
  const secondNumber = Number(current);

  if (operator === "+") {
    current = String(firstNumber + secondNumber);
  } else if (operator === "-") {
    current = String(firstNumber - secondNumber);
  } else if (operator === "*") {
    current = String(firstNumber * secondNumber);
  } else if (operator === "/" && secondNumber === 0) {
    current = "Error";
    firstNumber = null;
    operator = null;
  } else if (operator === "/") {
    current = String(firstNumber / secondNumber);
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const number = button.dataset.number;
    const action = button.dataset.action;
    const nextOperator = button.dataset.operator;

    if (number !== undefined) {
      if (startNewNumber || current === "0" || current === "Error") {
        current = number === "00" ? "0" : number;
        startNewNumber = false;
      } else {
        current += number;
      }
    } else if (action === "clear") {
      current = "0";
      firstNumber = null;
      operator = null;
      startNewNumber = false;
    } else if (action === "decimal") {
      if (startNewNumber || current === "Error") {
        current = "0";
        startNewNumber = false;
      }

      if (!current.includes(".")) {
        current += ".";
      }
    } else if (action === "percent") {
      if (current !== "Error") {
        current = String(Number(current) / 100);
        startNewNumber = true;
      }
    } else if (nextOperator) {
      if (operator !== null && !startNewNumber) {
        calculate();
      }

      if (current !== "Error") {
        firstNumber = Number(current);
        operator = nextOperator;
        startNewNumber = true;
      }
    } else if (action === "equals" && operator !== null) {
      calculate();
      operator = null;
      firstNumber = null;
      startNewNumber = true;
    }

    display.textContent = current;
  });
});