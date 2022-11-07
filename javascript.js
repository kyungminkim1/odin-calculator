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
    }   
    // return result
    return result;
}