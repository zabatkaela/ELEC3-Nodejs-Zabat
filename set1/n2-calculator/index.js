// Name: Kaela Ashley Nicole R. Zabat
// Section: IV-BSIT-C
// Activity: N2 - Modular Calculator
// Date: November 24, 2026

// Import custom modules and built-in module
const operations = require("./operations");
const { formatResult } = require("./formatter");
const path = require("path");

// Read command-line arguments
const operation = process.argv[2];
const a = Number(process.argv[3]);
const b = Number(process.argv[4]);

console.log("N2 - Modular Calculator");
console.log("Student: Kaela Ashley Nicole R. Zabat");
console.log("Program: " + path.basename(__filename));

// Validate inputs and perform calculation
try {
    if (process.argv.length !== 5) {
        throw new Error("Usage: node index.js add 12 8");
    }

    if (!Object.hasOwn(operations, operation)) {
        throw new Error("Unknown operation: " + operation);
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error("Please enter valid numbers.");
    }

    const result = operations[operation](a, b);

    console.log(formatResult(operation, a, b, result));

} catch (error) {
    console.log("Error: " + error.message);
}