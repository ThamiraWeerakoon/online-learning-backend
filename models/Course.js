const mongoose = require('mongoose');

// Define Course schema with title, description, instructor, and enrolled students
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    content: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Course', courseSchema);