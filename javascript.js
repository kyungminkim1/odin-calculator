function add(a, b) {
    // return result of a + b
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    // return result of a - b
    return a - b;
}

function multiply(a, b) {
    // return result of a * b
    return a * b;
}

function divide(a, b) {
    // return result of a / b
    if (b == 0) {
        return `Don't`;
    }
    return a / b;
}

function operate(operator, number1, number2) {
    // create result variable
    let result;
    // check operator using switch statement
    switch (operator) {
        // if '+', call add(number1, number2)
        case '+':
            result = add(number1, number2);
            break;
        // if '-', call subtract(number1, number2)
        case '-':
            result = subtract(number1, number2);
            break;
        // if '*', call multiply(number1, number2)
        case '*':
            result = multiply(number1, number2);
            break;
        // if '/', call divide(number1, number2)
        case '/':
            result = divide(number1, number2);
            break;
        // else print error message
        default:
            result = 'You should not be getting this message';
    }   
    // return result
    return result;
}

function addDigitToDisplay(digit) {
    // check if display is 0 and clicked digit is 0
    if (display.textContent === '0' && digit == 0){
        // empty return
        return;
    }

    // else check if display is 0 and clicked digit isn't 0
    else if (display.textContent === '0' && digit != 0) {
        // replace 0 with digit
        display.textContent = digit;
    }

    // else check if startNewNum is true and decimal point isn't used
    else if (startNewNum == true && display.textContent.slice(-1) !== '.') {
        // rewrite display with clicked digit
        display.textContent = digit;
        // set startNewNum to false
        startNewNum = false;
    }

    // else check if digit limit has been reached
    else if (display.textContent.length >= 10) {
        // empty return
        return;
    }

    // else append digit to display
    else {
        display.textContent += digit;
    }
}

function saveOperator(op) {
    // start a new number
    startNewNum = true;
    // check if currentOp and currentNum is not null
    if (currentOp != null && currentNum != null) {
        // get second number
        const secondNum = display.textContent;
        // calculate new currentNum using operate()
        currentNum = operate(currentOp, parseFloat(currentNum), parseFloat(secondNum));
        display.textContent = currentNum;
        
    }
    // else save current value in display
    else {
        currentNum = display.textContent;
    }
    // save operator symbol
    currentOp = op;
}

function calculateOperation() {
    const secondNum = display.textContent;
    // check if currentNum isn't null
    if (currentNum != null) {
        let result = operate(currentOp, currentNum, secondNum);
        if (typeof result === 'number') {
            // check if result is larger than 10 digits\
            if (result.toString().length > 10) {
                const currentLen = result.toString().length;
                result = result.toPrecision(5);
            }

            // else check if result isn't whole number
            else if (!Number.isInteger(result)) {
                // round to 9 decimal points max 
                result = Math.round(result * (10 ** 9)) / (10 ** 9);
            }
            display.textContent = result;
            currentNum = null;
            currentOp = null;
            startNewNum = true;
        }

        else {
            display.textContent = result;
            currentNum = null;
            currentOp = null;
            startNewNum = true;
        }
        
    }
}

function clearCalc() {
    display.textContent = 0;
    currentNum = null;
    currentOp = null;
}

function deleteLastChar() {
    if (display.textContent.length === 1) {
        display.textContent = 0;
    }
    else {
        const len = display.textContent.length;
        display.textContent = display.textContent.substring(0, len - 1);
    }
}

function addDecimalPoint() {
    const pointIndex = display.textContent.indexOf('.');
    if (pointIndex === -1) {
        display.textContent += '.';
    }
}

function checkKey(e) {
    // get key from event
    const key = e.key;
    // check which char it is against button symbols e.g. digits, operators, equal
    // if digit, call addDigitToDisplay(e)
    if (typeof parseInt(key) === 'number' && !Object.is(NaN, parseInt(key))) {
        addDigitToDisplay(key);
    }
    // if operator, call saveOperator(e)
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        saveOperator(key);
    }
    // if equal, call calculateOperation
    else if (key === '=' || key === 'Enter') {
        calculateOperation();
    }
    // if escape, call clearCalc
    else if (key === 'Escape') {
        clearCalc();
    }
    // if backspace, call deleteLastChar
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    // if '.', call addDecimalPoint
    else if (key === '.') {
        addDecimalPoint();
    }
}

function checkDigit(e) {
    // get digit from event
    const digit = e.target.textContent;
    // call addDigitToDisplay
    addDigitToDisplay(digit);
}

function checkOp(e) {
    // get digit from event
    const op = e.target.textContent;
    // call addDigitToDisplay
    saveOperator(op);
}

// create currentNum variable
let currentNum = null;
// create currentOp variable
let currentOp = null;
// create startNewNum variable
let startNewNum = false;
// get display node
const display = document.querySelector('.display');

function initialise() {
    // get digit buttons
    const digitBtns = document.querySelectorAll('.digit');
    const digitBtnsArr = [...digitBtns];
    // for each button:
        // add event listener on click
    digitBtnsArr.forEach(btn => btn.addEventListener('click', checkDigit));

    // get operation buttons
    const opBtns = document.querySelectorAll('.operation');
    const opBtnsArr = [...opBtns];
    // for each button:
    // add event listener on click
    // callback function will perform the following:
    opBtnsArr.forEach(btn => btn.addEventListener('click', checkOp));

    // get equal button
    const equalBtn = document.querySelector('#btn-equal');
    // add event listener on click
    // callback function will:
        // get current value from display (secondNum)
        // call operate()
        // display result from operate()
        // update currentNum
        // clear currentOp
        // set startNewNum to true
    equalBtn.addEventListener('click', calculateOperation);

    // get clear button
    const clearBtn = document.querySelector('#btn-clear');
    // add event listener
    // callback function will:
        // set display to 0
        // set currentNum to null
        // set currentOp to null
    clearBtn.addEventListener('click', clearCalc);

    // get backspace button
    // add event listener
    // callback will:
        // check if displayed digit is single digit
            // set display to 0
        // else remove last digit input
    const backspaceBtn = document.querySelector('#btn-backspace');
    backspaceBtn.addEventListener('click', deleteLastChar);

    // get decimal point button
    // add event listener
    // callback function will:
        // check if decimal point isn't used in display
            // append decimal point to display
    const pointBtn = document.querySelector('#btn-point');
    pointBtn.addEventListener('click', addDecimalPoint);

    // add event listeners to keyboard
    window.addEventListener('keydown', checkKey);

}

initialise();