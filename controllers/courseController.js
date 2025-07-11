const Course = require('../models/Course');

// Create a new course by instructor
const createCourse = async (req, res) => {
    try {
        const course = new Course({ ...req.body, instructor: req.user._id });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all courses (for students and instructors)
const getCourses = async (req, res) => {
    const courses = await Course.find().populate('instructor', 'username');
    res.json(courses);
};

// Get courses created by the logged-in instructor
const getInstructorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user._id });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Enroll a student in a course
const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course.students.includes(req.user._id)) {
            course.students.push(req.user._id);
            await course.save();
        }
        res.json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get courses a student is enrolled in
const getEnrolledCourses = async (req, res) => {
    const courses = await Course.find({ students: req.user._id });
    res.json(courses);
};

// Get students enrolled in a specific course (instructor only)
const getCourseStudents = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('students', 'username')
            .populate('instructor');

        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Now course.instructor is a full object, so .equals works
        if (!course.instructor._id.equals(req.user._id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        res.json(course.students);
    } catch (err) {
        console.error('❌ Failed to get enrolled students:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update course (title, description, content)
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (!course.instructor.equals(req.user._id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        course.title = req.body.title ?? course.title;
        course.description = req.body.description ?? course.description;
        course.content = req.body.content ?? course.content;

        await course.save();
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    enrollInCourse,
    getEnrolledCourses,
    getInstructorCourses,
    getCourseStudents,
    updateCourse,
};