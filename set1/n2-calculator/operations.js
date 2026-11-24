// Name: Kaela Ashley Nicole R. Zabat
// Section: IV-BSIT-C
// Activity: N2 - Modular Calculator
// Date: November 24, 2026

// Addition
function add(a, b) {
    return a + b;
}

// Subtraction
function subtract(a, b) {
    return a - b;
}

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Division with error handling
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return a / b;
}

// Calculate the average of two numbers
function average(a, b) {
    return (a + b) / 2;
}

// Export functions for use in other files
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    average
};