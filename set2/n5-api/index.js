
/*
Name: Kaela Ashley Nicole R. Zabat
Section: IV-BSIT-C
Activity: N5 - HTTP Methods and REST API
Date: November 28, 2026
*/

import http from 'node:http';

const PORT = 8000;

// Sample student records
let students = [
    { id: 1, name: 'Maria Santos', course: 'BSIT' },
    { id: 2, name: 'John Reyes', course: 'BSIT' },
    { id: 3, name: 'Anna Cruz', course: 'BSIT' }
];

// Create the API server
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // GET all students
    if (req.method === 'GET' && req.url === '/api/students') {

        res.statusCode = 200;
        res.end(JSON.stringify(students, null, 2));

    } else {

        res.statusCode = 404;
        res.end(JSON.stringify({
            message: 'Route not found'
        }));

    }

});

// Start the server
server.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
    console.log('Name: Kaela Ashley Nicole R. Zabat');
    console.log('Activity: N5 - HTTP Methods and REST API');
});
