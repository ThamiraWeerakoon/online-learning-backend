// Importing required modules
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const dotenv = require('dotenv'); // Module to load environment variables from a .env file

// Importing custom route handlers
const authRoutes = require('./routes/authRoutes'); // Routes for user authentication
const courseRoutes = require('./routes/courseRoutes'); // Routes for course CRUD operations
const chatRoutes = require('./routes/chatRoutes'); // Routes for ChatGPT integration

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected')) // Log success
    .catch(err => console.error(err)); // Log any errors during connection

// Route middleware
app.use('/api/auth', authRoutes); // User authentication endpoints
app.use('/api/courses', courseRoutes); // Course management endpoints
app.use('/api/chat', chatRoutes); // GPT-3 chat endpoints

// Start the server on the defined port
const PORT = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server