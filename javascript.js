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

