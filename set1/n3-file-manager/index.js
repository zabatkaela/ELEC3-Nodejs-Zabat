// Name: Kaela Ashley Nicole R. Zabat
// Section: IV-BSIT-C
// Activity: N3 - File Manager with fs and path
// Date: November 24, 2026

const fs = require("fs");
const path = require("path");

// Set the folder for text files
const folder = path.join(__dirname, "files");

// Get command-line arguments
const command = process.argv[2];
const filename = process.argv[3];
const content = process.argv.slice(4).join(" ");

console.log("N3 - File Manager");
console.log("Student: Kaela Ashley Nicole R. Zabat");

try {
    if (command === "list") {
        const files = fs.readdirSync(folder);

        files.forEach(function (file) {
            const fullPath = path.join(folder, file);

            if (fs.statSync(fullPath).isFile()) {
                console.log("--------------------");
                console.log("Full Path: " + fullPath);
                console.log("File Name: " + path.basename(fullPath));
                console.log("Extension: " + path.extname(fullPath));
                console.log("Contents: " + fs.readFileSync(fullPath, "utf8"));
            }
        });

    } else {
        if (!filename || filename !== path.basename(filename) ||
            path.extname(filename) !== ".txt" || filename.includes(":")) {
            throw new Error("Please provide a valid text filename.");
        }

        const filePath = path.join(folder, filename);

        switch (command) {
            case "create":
                fs.writeFileSync(filePath, content, { flag: "wx" });
                console.log("File created: " + filename);
                break;

            case "read":
                console.log("Contents: " + fs.readFileSync(filePath, "utf8"));
                break;

            case "update":
                if (!fs.existsSync(filePath)) {
                    throw new Error("File does not exist.");
                }
                fs.appendFileSync(filePath, "\n" + content);
                console.log("File updated: " + filename);
                break;

            case "delete":
                fs.unlinkSync(filePath);
                console.log("File deleted: " + filename);
                break;

            default:
                console.log("Invalid command.");
                console.log("Commands: create, read, update, delete, list");
        }
    }

} catch (error) {
    if (error.code === "ENOENT") {
        console.log("Error: File does not exist.");
    } else {
        console.log("Error: " + error.message);
    }
}