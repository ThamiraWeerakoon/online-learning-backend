const mongoose = require('mongoose');

// Define User schema with username, hashed password, and role (student or instructor or admin)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], required: true }
});

module.exports = mongoose.model('User', userSchema);