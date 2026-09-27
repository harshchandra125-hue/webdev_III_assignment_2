import { useState } from 'react';
import { projectFiles, apiEndpoints, postmanTests } from './data/projectFiles';

// Code Block Component
function CodeBlock({ code, language = 'javascript', title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-700">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <span className="text-gray-300 text-sm font-mono">{title}</span>
          <span className="text-xs text-gray-500 uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Method Badge Component
function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-green-100 text-green-800 border-green-200',
    POST: 'bg-blue-100 text-blue-800 border-blue-200',
    PUT: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    DELETE: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${colors[method] || 'bg-gray-100 text-gray-800'}`}>
      {method}
    </span>
  );
}

// Navigation Component
function Navigation({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (s: string) => void }) {
  const sections = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'structure', label: 'Structure', icon: '📁' },
    { id: 'code', label: 'Code Files', icon: '💻' },
    { id: 'api', label: 'API Docs', icon: '🔌' },
    { id: 'testing', label: 'Testing', icon: '🧪' },
    { id: 'commands', label: 'Commands', icon: '⚡' },
    { id: 'explanation', label: 'Explanation', icon: '📖' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-gray-900 text-lg hidden sm:block">Student Management API</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{section.icon}</span>
                <span className="hidden md:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
          <span>📚</span>
          <span>Web Development III - Unit 2 Lab Assignment</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Student Management REST API
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          A complete CRUD REST API built with Node.js and Express.js using in-memory data storage
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Node.js', 'Express.js', 'REST API', 'CRUD', 'Postman'].map((tech) => (
            <span key={tech} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>📋</span> Project Overview
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Objective</h3>
            <p className="text-gray-600 leading-relaxed">
              Build a Student Management REST API using Node.js and Express.js to perform CRUD (Create, Read, Update, Delete) operations on student records using in-memory data storage.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚙️ Technology Stack</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Runtime: Node.js</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Framework: Express.js</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Testing: Postman</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Language: JavaScript</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🚫 Restrictions</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-red-500">✗</span> No Database (MongoDB/MySQL)</li>
              <li className="flex items-center gap-2"><span className="text-red-500">✗</span> No Mongoose/ORM</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> In-memory JavaScript arrays only</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> JSON-style data storage</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">✨ Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-indigo-500">•</span> REST API Design</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">•</span> CRUD Operations</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">•</span> Modular Routing</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">•</span> Custom Logger Middleware</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">•</span> Error Handling</li>
              <li className="flex items-center gap-2"><span className="text-indigo-500">•</span> Proper HTTP Status Codes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Structure Section
function StructureSection() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>📁</span> Project Structure
        </h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <CodeBlock
            title="Folder Structure"
            language="text"
            code={`student-management-api/
├── app.js                    # Main Express server
├── package.json              # Project configuration
│
├── data/
│   └── students.js           # In-memory student data
│
├── middleware/
│   └── logger.js             # Custom request logger
│
└── routes/
    └── studentRoutes.js      # CRUD route handlers`}
          />
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">📄 app.js</h4>
            <p className="text-sm text-gray-600">Main server file - sets up Express, applies middleware, mounts routes, handles 404 errors</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">📄 data/students.js</h4>
            <p className="text-sm text-gray-600">In-memory array containing initial student records (no database)</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">📄 middleware/logger.js</h4>
            <p className="text-sm text-gray-600">Custom middleware that logs method, URL, and timestamp for every request</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-2">📄 routes/studentRoutes.js</h4>
            <p className="text-sm text-gray-600">Modular Express Router with all CRUD endpoints for /students</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Code Files Section
function CodeSection() {
  const [activeFile, setActiveFile] = useState(0);

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>💻</span> Complete Code Files
        </h2>

        {/* File Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {projectFiles.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFile === index
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* File Description */}
        <div className="mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <p className="text-sm text-indigo-800">
            <span className="font-semibold">📂 Path:</span> {projectFiles[activeFile].path}
          </p>
          <p className="text-sm text-indigo-700 mt-1">
            <span className="font-semibold">📝 Description:</span> {projectFiles[activeFile].description}
          </p>
        </div>

        {/* Code Display */}
        <CodeBlock
          code={projectFiles[activeFile].code}
          language={projectFiles[activeFile].language}
          title={projectFiles[activeFile].name}
        />
      </div>
    </section>
  );
}

// API Documentation Section
function APISection() {
  const [expandedEndpoint, setExpandedEndpoint] = useState<number | null>(0);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>🔌</span> API Documentation
        </h2>

        <div className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedEndpoint(expandedEndpoint === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <MethodBadge method={endpoint.method} />
                  <code className="text-gray-800 font-mono text-sm">{endpoint.endpoint}</code>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 hidden sm:block">{endpoint.description}</span>
                  <span className={`transform transition-transform ${expandedEndpoint === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedEndpoint === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">📥 Request</h4>
                      {endpoint.requestBody ? (
                        <CodeBlock
                          code={JSON.stringify(endpoint.requestBody, null, 2)}
                          language="json"
                          title="Request Body (JSON)"
                        />
                      ) : (
                        <p className="text-sm text-gray-500 italic">No request body required</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">📤 Success Response ({endpoint.successStatus})</h4>
                      <CodeBlock
                        code={JSON.stringify(endpoint.responseBody, null, 2)}
                        language="json"
                        title="Response Body"
                      />
                    </div>
                  </div>
                  {endpoint.errorResponse && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">❌ Error Response ({endpoint.errorStatus})</h4>
                      <CodeBlock
                        code={JSON.stringify(endpoint.errorResponse, null, 2)}
                        language="json"
                        title="Error Response"
                      />
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200">
                      ✓ {endpoint.successStatus} Success
                    </span>
                    {endpoint.errorStatus && (
                      <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                        ✗ {endpoint.errorStatus} Error
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testing Section
function TestingSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>🧪</span> Postman Testing Guide
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📌 Base URL</h3>
          <code className="bg-gray-100 px-4 py-2 rounded-lg text-indigo-700 font-mono text-sm">
            http://localhost:3000
          </code>
        </div>

        <div className="space-y-4">
          {postmanTests.map((test, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-gray-100 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <h4 className="font-semibold text-gray-900">{test.description}</h4>
              </div>
              
              <div className="ml-11 space-y-3">
                <div className="flex items-center gap-3">
                  <MethodBadge method={test.method} />
                  <code className="text-sm text-gray-700 font-mono bg-gray-50 px-3 py-1 rounded">{test.url}</code>
                </div>
                
                {test.body && (
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Request Body:</span>
                    <CodeBlock
                      code={JSON.stringify(test.body, null, 2)}
                      language="json"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Expected Status:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    test.expectedStatus < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {test.expectedStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">💡 Testing Tips</h3>
          <ul className="space-y-2 text-amber-800 text-sm">
            <li>• Start the server first with <code className="bg-amber-100 px-1 rounded">npm start</code></li>
            <li>• For POST and PUT requests, set the body type to <strong>raw → JSON</strong></li>
            <li>• Set the <code className="bg-amber-100 px-1 rounded">Content-Type</code> header to <code className="bg-amber-100 px-1 rounded">application/json</code></li>
            <li>• Test error cases: missing fields, invalid IDs, unknown routes</li>
            <li>• Check the terminal for logger middleware output</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Commands Section
function CommandsSection() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>⚡</span> Installation & Run Commands
        </h2>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Create Project Directory</h3>
            <CodeBlock
              code={`mkdir student-management-api
cd student-management-api`}
              language="bash"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Initialize Node.js Project</h3>
            <CodeBlock
              code={`npm init -y`}
              language="bash"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Install Dependencies</h3>
            <CodeBlock
              code={`# Install Express.js (production dependency)
npm install express

# Install nodemon (development dependency)
npm install --save-dev nodemon`}
              language="bash"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Create Folder Structure</h3>
            <CodeBlock
              code={`mkdir data middleware routes`}
              language="bash"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5️⃣ Run the Server</h3>
            <CodeBlock
              code={`# Production mode
npm start

# Development mode (auto-restart on file changes)
npm run dev`}
              language="bash"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Expected Output</h3>
            <CodeBlock
              code={`Server is running on http://localhost:3000`}
              language="text"
            />
            <p className="text-sm text-green-700 mt-3">
              Once you see this message, the server is ready to accept API requests!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Explanation Section
function ExplanationSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span>📖</span> How It Works
        </h2>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              CRUD Operations
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h4 className="font-semibold text-green-800 mb-2">Create (POST)</h4>
                <p className="text-sm text-green-700">Adds a new student to the array. Validates that name and course are provided. Auto-generates the next ID.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Read (GET)</h4>
                <p className="text-sm text-blue-700">Retrieves all students or a single student by ID. Uses <code className="bg-blue-100 px-1 rounded">find()</code> method on the array.</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <h4 className="font-semibold text-yellow-800 mb-2">Update (PUT)</h4>
                <p className="text-sm text-yellow-700">Finds student by ID using <code className="bg-yellow-100 px-1 rounded">findIndex()</code>, then replaces the data at that index.</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                <h4 className="font-semibold text-red-800 mb-2">Delete (DELETE)</h4>
                <p className="text-sm text-red-700">Finds student by ID, then removes from array using <code className="bg-red-100 px-1 rounded">splice()</code>.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Modular Routing
            </h3>
            <p className="text-gray-600 mb-4">
              Routes are defined in a separate file using <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">express.Router()</code>. This keeps the code organized and maintainable.
            </p>
            <CodeBlock
              code={`// In app.js - mount the router
app.use('/students', studentRoutes);

// In studentRoutes.js - define routes
router.get('/', ...);       // GET /students
router.get('/:id', ...);    // GET /students/:id
router.post('/', ...);      // POST /students
router.put('/:id', ...);    // PUT /students/:id
router.delete('/:id', ...); // DELETE /students/:id`}
              language="javascript"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Custom Middleware (Logger)
            </h3>
            <p className="text-gray-600 mb-4">
              Middleware functions run before route handlers. Our logger captures every request with method, URL, and timestamp.
            </p>
            <CodeBlock
              code={`// middleware/logger.js
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(\`\${req.method} \${req.url} - \${timestamp}\`);
  next(); // Important: pass control to next middleware
};

// Applied globally in app.js
app.use(logger);

// Console output example:
// GET /students - 2026-09-27 20:30:00
// POST /students - 2026-09-27 20:31:15`}
              language="javascript"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Error Handling
            </h3>
            <p className="text-gray-600 mb-4">
              Every endpoint validates input and returns appropriate HTTP status codes with consistent JSON error responses.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-700">200</div>
                <div className="text-xs text-green-600">OK / Success</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-700">201</div>
                <div className="text-xs text-blue-600">Created</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="text-2xl font-bold text-yellow-700">400</div>
                <div className="text-xs text-yellow-600">Bad Request</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-red-700">404</div>
                <div className="text-xs text-red-600">Not Found</div>
              </div>
            </div>
            <div className="mt-4">
              <CodeBlock
                code={`// Error response format (consistent across all errors)
{
  "success": false,
  "message": "Error description here"
}

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              Request Flow
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-3 text-sm">
              <div className="bg-gray-100 rounded-lg px-4 py-3 text-center font-medium">Client Request</div>
              <span className="text-gray-400 text-xl">→</span>
              <div className="bg-purple-100 rounded-lg px-4 py-3 text-center font-medium text-purple-800">Logger Middleware</div>
              <span className="text-gray-400 text-xl">→</span>
              <div className="bg-blue-100 rounded-lg px-4 py-3 text-center font-medium text-blue-800">Route Handler</div>
              <span className="text-gray-400 text-xl">→</span>
              <div className="bg-green-100 rounded-lg px-4 py-3 text-center font-medium text-green-800">JSON Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg font-semibold text-white mb-2">Student Management REST API</p>
        <p className="text-sm">Web Development III - Unit 2 Lab Assignment</p>
        <p className="text-xs mt-4 text-gray-500">
          Built with Node.js & Express.js | No Database | In-Memory Data Storage
        </p>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <HeroSection />
            <OverviewSection />
          </>
        );
      case 'structure':
        return <StructureSection />;
      case 'code':
        return <CodeSection />;
      case 'api':
        return <APISection />;
      case 'testing':
        return <TestingSection />;
      case 'commands':
        return <CommandsSection />;
      case 'explanation':
        return <ExplanationSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}
