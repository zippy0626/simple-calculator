// MOUSE HOLD EFFECT
isMouseDown = false;
isMouseHovered = false;
function checkMouse() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      isMouseHovered = true;
    });
    button.addEventListener("mousedown", () => {
      isMouseDown = true;
      if (isMouseDown && !isMouseHovered) {
        return;
      }
      button.style.borderRadius = "50%";
      button.style.backgroundColor = "whitesmoke";
    });
    button.addEventListener("mouseleave", () => {
      isMouseHovered = false;
      button.style.backgroundColor = "";
    });
    button.addEventListener("mouseup", () => {
      isMouseDown = false;
      button.style.backgroundColor = "";
      return;
    });
  });
}
checkMouse();

function handleDelete() {
  if (currentNum === 1 && firstNum != "") {
    firstNum = firstNum.slice(0, -1);
    numbers.textContent = firstNum;
    return;
  } else if (currentNum === 2 && secondNum != "") {
    secondNum = secondNum.slice(0, -1);
    numbers.textContent = numbers.textContent.slice(0, -1);
    return;
  }
}

function resetCalc() {
  firstNum = "";
  secondNum = "";
  operator = "";
  currentNum = 1;
}

// CALC
firstNum = "";
operator = "";
secondNum = "";

currentNum = 1;

const start = document.querySelector(".start");
const numbers = document.querySelector(".numbers"); // DISPLAY NUMBERS
const numbersHistory = document.querySelector(".numbers-history");

// Handle Number Button Clicks
const buttonSection = document.querySelector(".calculator-buttons");
buttonSection.addEventListener("click", (e) => {
  start.style.display = "none";
  numbers.style.display = "flex";
  numbersHistory.style.display = "none"; //reset history after button press

  const buttonValue = e.target.innerText.trim();
  const buttonClassList = e.target.classList;

  if (
    (!isNaN(buttonValue) && buttonValue != "") ||
    buttonClassList.contains("percent")
  ) {
    // Number and not empty (delete)
    if (currentNum === 1) {
      firstNum += buttonValue;
      numbers.textContent = firstNum;
    } else if (currentNum === 2) {
      // Add and Show Second Number
      secondNum += buttonValue;
      numbers.textContent += buttonValue;
    }
    return;
  }

  if (buttonValue === "AC") {
    // All Clear
    resetCalc();
    numbers.textContent = "";
    return;
  }

  if (buttonValue === '.') {
    if (currentNum === 1) {
        if (!firstNum.includes('.')) {
            firstNum += buttonValue;
            numbers.textContent = firstNum;
        }
        } else if (currentNum === 2) {
        // Add and Show Second Number
        if (!secondNum.includes('.')) {
            secondNum += buttonValue;
            numbers.textContent += buttonValue;
        }
        }
    return;
  }

  if (buttonClassList.contains("delete-button")) {
    // Delete
    handleDelete();
    return;
  }

  if (buttonClassList.contains("operation-button")) {
    // Operation Buttons
    if (buttonValue === "=") {
      calculateResult();
      return;
    }

    if (firstNum && currentNum === 1) {
      // Only allow one operator at a time
      operator = buttonValue;
      currentNum = 2;
      numbers.textContent = firstNum + operator;
    }
    return;
  }
});

function handlePercentage(numberStr) {
  if (numberStr.length === 1 && numberStr.includes("%")) {
    return 0.01;
  }

  let countPercentSigns = numberStr.match(/%/g).length;

  let num = parseFloat(numberStr);
  for (let i = 0; i < countPercentSigns; i++) {
    num /= 100;
  }

  return Math.round(num * 10000000) / 10000000; // round at 6 digits
}



let result = 0;
function calculateResult() {
  //calculate result based on firstNum operator and secNum
  // Use these variable instead
  let num1 = 0;
  let num2 = 0;

  if (!firstNum && !secondNum && !operator) {
    return;
  }

  if (firstNum && secondNum && operator) {
    if (firstNum.includes("%") || secondNum.includes("%")) {
      num1 = handlePercentage(firstNum);
      num2 = handlePercentage(secondNum);
    } else {
      num1 = parseFloat(firstNum);
      num2 = parseFloat(secondNum);
    }

    switch (operator) {
      case "÷":
        if (num2 === 0) {
          numbers.textContent = "Cannot Divide By Zero";
          return;
        }
        result = num1 / num2;
        break;
      case "×":
        result = num1 * num2;
        break;
      case "−":
        result = num1 - num2;
        break;
      case "+":
        result = num1 + num2;
        break;
    }
  } else if (firstNum && !secondNum && !operator) {
    //only one number
    if (firstNum.includes("%")) {
      num1 = handlePercentage(firstNum);
      result = num1;
    } else {
      num1 = parseFloat(firstNum);
      result = num1;
    }
  }
  // Show History before showing result
  numbersHistory.textContent = numbers.textContent;
  numbersHistory.style.display = "flex";

  numbers.textContent = result;
  resetCalc();
  // Store Result to firstNum
  firstNum = result.toString();
}