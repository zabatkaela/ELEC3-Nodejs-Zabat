
/*
Name: Kaela Ashley Nicole R. Zabat
Section: IV-BSIT-C
Activity: N6 - Middleware and API Testing
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

let nextId = 4;

// First middleware: Request logger
function logger(req, res, next) {
    const dateTime = new Date().toLocaleString();

    console.log(`[${dateTime}] ${req.method} ${req.url}`);

    next();
}

// Second middleware: JSON Content-Type
function jsonMiddleware(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    next();
}

// Send JSON response
function sendJSON(res, statusCode, data) {
    res.statusCode = statusCode;

    res.end(JSON.stringify(data, null, 2));
}

// Read request body
async function readBody(req) {
    let body = '';

    for await (const chunk of req) {
        body += chunk;
    }

    return JSON.parse(body);
}

// Handle API routes
async function handleRoutes(req, res) {

    const method = req.method;
    const url = req.url;

    const match = url.match(/^\/api\/students\/(\d+)$/);
    const id = match ? Number(match[1]) : null;

    try {

        // GET all students
        if (method === 'GET' && url === '/api/students') {
            return sendJSON(res, 200, students);
        }

        // GET one student
        if (method === 'GET' && match) {

            const student = students.find(s => s.id === id);

            if (!student) {
                return sendJSON(res, 404, {
                    message: 'Student not found'
                });
            }

            return sendJSON(res, 200, student);
        }

        // POST a new student
        if (method === 'POST' && url === '/api/students') {

            const data = await readBody(req);

            if (!data || !data.name || !data.course) {
                return sendJSON(res, 400, {
                    message: 'Name and course are required'
                });
            }

            const newStudent = {
                id: nextId++,
                name: data.name,
                course: data.course
            };

            students.push(newStudent);

            return sendJSON(res, 201, newStudent);
        }

        // PUT update a student
        if (method === 'PUT' && match) {

            const student = students.find(s => s.id === id);

            if (!student) {
                return sendJSON(res, 404, {
                    message: 'Student not found'
                });
            }

            const data = await readBody(req);

            if (!data || !data.name || !data.course) {
                return sendJSON(res, 400, {
                    message: 'Name and course are required'
                });
            }

            student.name = data.name;
            student.course = data.course;

            return sendJSON(res, 200, student);
        }

        // DELETE a student
        if (method === 'DELETE' && match) {

            const index = students.findIndex(s => s.id === id);

            if (index === -1) {
                return sendJSON(res, 404, {
                    message: 'Student not found'
                });
            }

            students.splice(index, 1);

            return sendJSON(res, 200, {
                message: 'Student deleted successfully'
            });
        }

        return sendJSON(res, 404, {
            message: 'Route not found'
        });

    } catch (error) {

        return sendJSON(res, 400, {
            message: 'Invalid request data'
        });
    }
}

// Apply both middleware functions
const server = http.createServer((req, res) => {

    logger(req, res, () => {

        jsonMiddleware(req, res, () => {

            handleRoutes(req, res);

        });

    });

});

// Start the server
server.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
    console.log('Name: Kaela Ashley Nicole R. Zabat');
    console.log('Section: IV-BSIT-C');
    console.log('Activity: N6 - Middleware and API Testing');
    console.log('Logger middleware is active.');
    console.log('JSON Content-Type middleware is active.');
});
