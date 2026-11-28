
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

let nextId = 4;

// Send a JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(data, null, 2));
}

// Read JSON data from the request body
async function readBody(req) {
    let body = '';

    for await (const chunk of req) {
        body += chunk;
    }

    return JSON.parse(body);
}

// Create the API server
const server = http.createServer(async (req, res) => {

    const method = req.method;
    const url = req.url;

    // Identify a student ID from the URL
    const match = url.match(/^\/api\/students\/(\d+)$/);
    const id = match ? Number(match[1]) : null;

    try {

        // GET: Retrieve all students
        if (method === 'GET' && url === '/api/students') {

            return sendJSON(res, 200, students);

        }

        // GET: Retrieve one student
        if (method === 'GET' && match) {

            const student = students.find(s => s.id === id);

            if (!student) {
                return sendJSON(res, 404, {
                    message: 'Student not found'
                });
            }

            return sendJSON(res, 200, student);

        }

        // POST: Add a new student
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

        // PUT: Update an existing student
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

        // DELETE: Remove a student
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

        // Handle unknown routes
        return sendJSON(res, 404, {
            message: 'Route not found'
        });

    } catch (error) {

        return sendJSON(res, 400, {
            message: 'Invalid request data'
        });

    }

});

// Start the server
server.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
    console.log('Name: Kaela Ashley Nicole R. Zabat');
    console.log('Activity: N5 - HTTP Methods and REST API');
});
