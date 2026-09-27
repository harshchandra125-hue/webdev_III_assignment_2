// All project code files for the Student Management REST API

export const projectFiles = [
  {
    name: "package.json",
    path: "student-management-api/package.json",
    language: "json",
    description: "Project configuration with dependencies and scripts",
    code: `{
  "name": "student-management-api",
  "version": "1.0.0",
  "description": "Student Management REST API using Node.js and Express.js",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": ["express", "rest-api", "students", "crud"],
  "author": "Student",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}`
  },
  {
    name: "app.js",
    path: "student-management-api/app.js",
    language: "javascript",
    description: "Main Express server setup with middleware and routes",
    code: `// Import required modules
const express = require('express');

// Import custom middleware
const logger = require('./middleware/logger');

// Import routes
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();

// Define port number
const PORT = 3000;

// ==========================================
// Middleware Setup
// ==========================================

// Parse incoming JSON requests
app.use(express.json());

// Apply custom logger middleware globally
app.use(logger);

// ==========================================
// Routes
// ==========================================

// Mount student routes at /students
app.use('/students', studentRoutes);

// ==========================================
// 404 Handler for Unknown Routes
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ==========================================
// Start the Server
// ==========================================

app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});`
  },
  {
    name: "students.js",
    path: "student-management-api/data/students.js",
    language: "javascript",
    description: "In-memory student data array (no database)",
    code: `// In-memory student data array
// No database is used - data is stored in a JavaScript array

const students = [
  {
    id: 1,
    name: "Rahul",
    course: "BCA"
  },
  {
    id: 2,
    name: "Priya",
    course: "BTech"
  },
  {
    id: 3,
    name: "Amit",
    course: "BCA"
  }
];

module.exports = students;`
  },
  {
    name: "studentRoutes.js",
    path: "student-management-api/routes/studentRoutes.js",
    language: "javascript",
    description: "Modular CRUD routes for student operations",
    code: `// Import Express router
const express = require('express');
const router = express.Router();

// Import student data
const students = require('../data/students');

// ==========================================
// GET /students - Get all students
// ==========================================

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// ==========================================
// GET /students/:id - Get single student by ID
// ==========================================

router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  
  // Find student by ID
  const student = students.find(s => s.id === studentId);
  
  // If student not found, return 404
  if (!student) {
    return res.status(404).json({
      success: false,
      message: \`Student with ID \${studentId} not found\`
    });
  }
  
  // Return the student
  res.status(200).json({
    success: true,
    data: student
  });
});

// ==========================================
// POST /students - Create a new student
// ==========================================

router.post('/', (req, res) => {
  const { name, course } = req.body;
  
  // Validate required fields
  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: "Please provide both name and course"
    });
  }
  
  // Create new student object
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: name,
    course: course
  };
  
  // Add to array
  students.push(newStudent);
  
  // Return created student
  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
});

// ==========================================
// PUT /students/:id - Update an existing student
// ==========================================

router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, course } = req.body;
  
  // Validate required fields
  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: "Please provide both name and course"
    });
  }
  
  // Find student index
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  // If student not found, return 404
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: \`Student with ID \${studentId} not found\`
    });
  }
  
  // Update student data
  students[studentIndex] = {
    id: studentId,
    name: name,
    course: course
  };
  
  // Return updated student
  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: students[studentIndex]
  });
});

// ==========================================
// DELETE /students/:id - Delete a student
// ==========================================

router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  
  // Find student index
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  // If student not found, return 404
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: \`Student with ID \${studentId} not found\`
    });
  }
  
  // Remove student from array
  const deletedStudent = students.splice(studentIndex, 1);
  
  // Return success response
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent[0]
  });
});

// Export the router
module.exports = router;`
  },
  {
    name: "logger.js",
    path: "student-management-api/middleware/logger.js",
    language: "javascript",
    description: "Custom middleware to log every incoming HTTP request",
    code: `// Custom Logger Middleware
// Logs every incoming HTTP request with method, URL, and timestamp

const logger = (req, res, next) => {
  // Get current date and time
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
  
  // Log request information
  console.log(\`\${req.method} \${req.url} - \${timestamp}\`);
  
  // Move to the next middleware or route handler
  next();
};

module.exports = logger;`
  }
];

export const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/students",
    description: "Return all student records",
    successStatus: 200,
    requestBody: null,
    responseBody: {
      success: true,
      count: 3,
      data: [
        { id: 1, name: "Rahul", course: "BCA" },
        { id: 2, name: "Priya", course: "BTech" },
        { id: 3, name: "Amit", course: "BCA" }
      ]
    }
  },
  {
    method: "GET",
    endpoint: "/students/:id",
    description: "Return a single student using the student ID",
    successStatus: 200,
    errorStatus: 404,
    requestBody: null,
    responseBody: {
      success: true,
      data: { id: 1, name: "Rahul", course: "BCA" }
    },
    errorResponse: {
      success: false,
      message: "Student with ID 99 not found"
    }
  },
  {
    method: "POST",
    endpoint: "/students",
    description: "Create and add a new student",
    successStatus: 201,
    errorStatus: 400,
    requestBody: { name: "Neha", course: "BTech" },
    responseBody: {
      success: true,
      message: "Student created successfully",
      data: { id: 4, name: "Neha", course: "BTech" }
    },
    errorResponse: {
      success: false,
      message: "Please provide both name and course"
    }
  },
  {
    method: "PUT",
    endpoint: "/students/:id",
    description: "Update an existing student's information",
    successStatus: 200,
    errorStatus: 404,
    requestBody: { name: "Rahul Updated", course: "BTech" },
    responseBody: {
      success: true,
      message: "Student updated successfully",
      data: { id: 1, name: "Rahul Updated", course: "BTech" }
    },
    errorResponse: {
      success: false,
      message: "Student with ID 99 not found"
    }
  },
  {
    method: "DELETE",
    endpoint: "/students/:id",
    description: "Delete an existing student",
    successStatus: 200,
    errorStatus: 404,
    requestBody: null,
    responseBody: {
      success: true,
      message: "Student deleted successfully",
      data: { id: 1, name: "Rahul", course: "BCA" }
    },
    errorResponse: {
      success: false,
      message: "Student with ID 99 not found"
    }
  }
];

export const postmanTests = [
  {
    method: "GET",
    url: "http://localhost:3000/students",
    body: null,
    expectedStatus: 200,
    description: "Get all students"
  },
  {
    method: "GET",
    url: "http://localhost:3000/students/1",
    body: null,
    expectedStatus: 200,
    description: "Get student with ID 1"
  },
  {
    method: "POST",
    url: "http://localhost:3000/students",
    body: { name: "Neha", course: "BTech" },
    expectedStatus: 201,
    description: "Create a new student"
  },
  {
    method: "PUT",
    url: "http://localhost:3000/students/1",
    body: { name: "Rahul Updated", course: "BTech" },
    expectedStatus: 200,
    description: "Update student with ID 1"
  },
  {
    method: "DELETE",
    url: "http://localhost:3000/students/1",
    body: null,
    expectedStatus: 200,
    description: "Delete student with ID 1"
  }
];
