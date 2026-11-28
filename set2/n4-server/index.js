
/*
Name: Kaela Ashley Nicole R. Zabat
Section: IV-BSIT-C
Activity: N4 - Basic HTTP Server
Date: November 28, 2026
*/

import http from 'node:http';

const PORT = 8000;
const studentName = 'Kaela Ashley Nicole R. Zabat';
const section = 'IV-BSIT-C';

// Create the HTTP server
const server = http.createServer((req, res) => {

    let statusCode = 200;
    let content = '';

    // Handle different URL routes
    if (req.url === '/') {

        content = `
            <h1>Welcome to My HTTP Server</h1>
            <p>Name: ${studentName}</p>
            <p>Section: ${section}</p>
            <p>Activity: N4 - Basic HTTP Server</p>
        `;

    } else if (req.url === '/about') {

        content = `
            <h1>About Me</h1>
            <p>My name is ${studentName}.</p>
            <p>I am a fourth-year BS Information Technology student.</p>
            <p>I enjoy learning programming and web development.</p>
        `;

    } else if (req.url === '/contact') {

        content = `
            <h1>Contact Page</h1>
            <p>Name: ${studentName}</p>
            <p>Section: ${section}</p>
            <p>GitHub: <a href="https://github.com/zabatkaela">zabatkaela</a></p>
        `;

    } else {

        statusCode = 404;

        content = `
            <h1>404 - Page not found</h1>
            <p>The requested page does not exist.</p>
            <p>Name: ${studentName}</p>
        `;
    }

    // Send the correct HTTP status and content type
    res.writeHead(statusCode, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>N4 - Basic HTTP Server</title>
        </head>
        <body>
            <nav>
                <a href="/">Home</a> |
                <a href="/about">About</a> |
                <a href="/contact">Contact</a>
            </nav>
            <hr>
            ${content}
        </body>
        </html>
    `);

});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Name: ${studentName}`);
});
