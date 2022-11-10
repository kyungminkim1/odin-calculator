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
    // check if parameters are valid
        // if false, return 'error'
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

// get display node
const display = document.querySelector('.display');

// get digit buttons
const digitBtns = document.querySelectorAll('.digit');
const digitBtnsArr = [...digitBtns];
// for each button:
    // add event listener on click
digitBtnsArr.forEach(btn => btn.addEventListener('click', function(e) {
    // callback function will display matching digit
    display.textContent += e.target.textContent;
}));

function initialise() {
    // create currentNum variable
    let currentNum;
    // create currentOp variable
    let currentOp;

    // get operation buttons
    const opBtns = document.querySelectorAll('.operation');
    const opBtnsArr = [...opBtns];
    // for each button:
    // add event listener on click
    // callback function will:
        // save current value in display
        // save operation symbol
        // display operator
    opBtnsArr.forEach(btn => btn.addEventListener('click', function(e) {
        currentOp = e.target.textContent;
        currentNum = display.textContent;
        display.textContent += currentOp;
    }));

    // get equal button
    const equalBtn = document.querySelector('#btn-equal');
    // add event listener on click
    // callback function will:
        // call operate()
        // display result from operate()
        // update currentNum
        // clear currentOp
    equalBtn.addEventListener('click', function(e){
        const secondNum = display.textContent.split(currentOp)[1];
        const result = operate(currentOp, parseInt(currentNum), parseInt(secondNum));
        display.textContent = result;
        currentNum = result;
        currentOp = null;
    })
}