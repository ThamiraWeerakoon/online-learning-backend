const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
    try {
        const course = new Course({ ...req.body, instructor: req.user.id });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    const courses = await Course.find().populate('instructor', 'username');
    res.json(courses);
};

// Enroll a student in a course
const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course.students.includes(req.user.id)) {
            course.students.push(req.user.id);
            await course.save();
        }
        res.json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get enrolled courses for a student
const getEnrolledCourses = async (req, res) => {
    const courses = await Course.find({ students: req.user.id });
    res.json(courses);
};

module.exports = { createCourse, getCourses, enrollInCourse, getEnrolledCourses };