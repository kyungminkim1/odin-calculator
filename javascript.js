function add(a, b) {
    // return result of a + b
    return a + b;
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
        // if 'x', call multiply(number1, number2)
        case 'x':
            result = multiply(number1, number2);
            break;
        // if '÷', call divide(number1, number2)
        case '÷':
            result = divide(number1, number2);
            break;
        // else print error message
        default:
            result = 'You should not be getting this message';
    }   
    // return result
    return result;
}

function initialise() {
    // create currentNum variable
    let currentNum = null;
    // create currentOp variable
    let currentOp = null;
    // create startNewNum variable
    let startNewNum = false;

    // get display node
    const display = document.querySelector('.display');

    // get digit buttons
    const digitBtns = document.querySelectorAll('.digit');
    const digitBtnsArr = [...digitBtns];
    // for each button:
        // add event listener on click
    digitBtnsArr.forEach(btn => btn.addEventListener('click', function(e) {
        // get digit from button
        const clickedDigit = e.target.textContent;
        // check if display is 0 and clicked digit is 0
        if (display.textContent == 0 && clickedDigit == 0){
            // empty return
            return;
        }

        // else check if display is 0 and clicked digit isn't 0
        else if (display.textContent == 0 && clickedDigit != 0) {
            // replace 0 with digit
            display.textContent = clickedDigit;
        }

        // else check if startNewNum is true
        else if (startNewNum == true) {
            // rewrite display with clicked digit
            display.textContent = clickedDigit;
            // set startNewNum to false
            startNewNum = false;
        }

        // else append digit to display
        else {
            display.textContent += clickedDigit;
        }
    }));

    // get operation buttons
    const opBtns = document.querySelectorAll('.operation');
    const opBtnsArr = [...opBtns];
    // for each button:
    // add event listener on click
    // callback function will:
        // save current value in display
        // save operation symbol
        // set startNewNum to true
    opBtnsArr.forEach(btn => btn.addEventListener('click', function(e) {
        currentOp = e.target.textContent;
        currentNum = display.textContent;
        startNewNum = true;
    }));

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
    equalBtn.addEventListener('click', function(e){
        const secondNum = display.textContent;
        const result = operate(currentOp, parseFloat(currentNum), parseFloat(secondNum));
        display.textContent = result;
        currentNum = null;
        currentOp = null;
        startNewNum = true;
    });

    // get clear button
    const clearBtn = document.querySelector('#btn-clear');
    // add event listener
    // callback function will:
        // set display to 0
        // set currentNum to null
        // set currentOp to null
    clearBtn.addEventListener('click', function() {
        display.textContent = 0;
        currentNum = null;
        currentOp = null;
    });

}

initialise();