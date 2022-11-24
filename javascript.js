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

        // else check if digit limit has been reached
        else if (display.textContent.length >= 10) {
            // empty return
            return;
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
    // callback function will perform the following:
    opBtnsArr.forEach(btn => btn.addEventListener('click', function(e) {
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
        currentOp = e.target.textContent;
            

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

    // get backspace button
    // add event listener
    // callback will:
        // check if displayed digit is single digit
            // set display to 0
        // else remove last digit input
    const backspaceBtn = document.querySelector('#btn-backspace');
    backspaceBtn.addEventListener('click', function() {
        if (display.textContent.length === 1) {
            display.textContent = 0;
        }
        else {
            const len = display.textContent.length;
            display.textContent = display.textContent.substring(0, len - 1);
        }
    });

    // get decimal point button
    // add event listener
    // callback function will:
        // check if decimal point isn't used in display
        // append decimal point to display

}

initialise();