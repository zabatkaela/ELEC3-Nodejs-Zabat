// Name: Kaela Ashley Nicole R. Zabat
// Section: IV-BSIT-C
// Activity: N2 - Modular Calculator
// Date: November 24, 2026

// Format the calculator result
function formatResult(operation, a, b, result) {
    const symbols = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/"
    };

    if (operation === "average") {
        return "Average of " + a + " and " + b + " = " + result;
    }

    return a + " " + symbols[operation] + " " + b + " = " + result;
}

// Export the formatter function
module.exports = { formatResult };