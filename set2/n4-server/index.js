
/*
Name: Kaela Ashley Nicole R. Zabat
Section: IV-BSIT-C
Activity: N4 - Basic HTTP Server
Date: November 28, 2026
*/

import http from 'node:http';

const PORT = 8000;

// Create a basic HTTP server
const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <h1>Welcome to My HTTP Server</h1>
        <p>Name: Kaela Ashley Nicole R. Zabat</p>
        <p>Section: IV-BSIT-C</p>
        <p>Activity: N4 - Basic HTTP Server</p>
    `);

});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Name: Kaela Ashley Nicole R. Zabat');
});
