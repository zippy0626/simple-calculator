// MOUSE HOLD EFFECT
let isMouseDown = false;
let isMouseHovered = false;
function checkMouse() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
        button.addEventListener('mouseover', () => {
            isMouseHovered = true;
        });
        button.addEventListener('mousedown', () => {
            isMouseDown = true;
            if (isMouseDown && !isMouseHovered) {
                return;
            }
            button.style.borderRadius = '50%'
            button.style.backgroundColor = 'black'
        });
        button.addEventListener('mouseleave', () => {
            isMouseHovered = false;
            button.style.backgroundColor = ''
        });
        button.addEventListener('mouseup', () => {
            isMouseDown = false;
            button.style.backgroundColor = ''
            return;
        });
    });
}
checkMouse()

// HIDE
function hide(element) {
    if (element === 'start') {
        start.style.display = 'none'
    }
}
function show(element) {
    if (element === 'numbers') {
        numbers.style.display = 'flex'
    }
}


// CALC
let firstNum = "";
let secondNum = "";

function updateAndConvert(whichNum, digit) {
    if (whichNum === "first") {
        firstNum += digit
        return parseInt(firstNum)
    } else if (whichNum === "second") {
        secondNum += digit
        return parseInt(secondNum)
    } 
}


const start = document.querySelector('.start');
const numbers = document.querySelector('.numbers');
const numbersHistory = document.querySelector('.numbers-history');

function startCalculator() {
    const numberButtons = document.querySelectorAll('.button');
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains("n-0")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 0)
                show('numbers')

            } else if (button.classList.contains("n-1")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 1)
                show('numbers')

            } else if (button.classList.contains("n-2")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 2)
                show('numbers')

            } else if (button.classList.contains("n-3")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 3)
                show('numbers')

            } else if (button.classList.contains("n-4")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 4)
                show('numbers')

            } else if (button.classList.contains("n-5")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 5)
                show('numbers')

            } else if (button.classList.contains("n-6")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 6)
                show('numbers')

            } else if (button.classList.contains("n-7")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 7)
                show('numbers')

            } else if (button.classList.contains("n-8")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 8)
                show('numbers')

            } else if (button.classList.contains("n-9")) {
                hide("start")
                numbers.textContent = updateAndConvert('first', 9)
                show('numbers')

            } else if (button.classList.contains("all-clear")) {
                hide("start")
                firstNum = ''
                secondNum = ''
                numbers.textContent = ""
                show('numbers')
            } 
        });
    });
}
startCalculator()