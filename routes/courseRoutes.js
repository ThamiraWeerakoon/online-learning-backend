const express = require('express');
const router = express.Router();
const {
    createCourse,
    getCourses,
    enrollInCourse,
    getEnrolledCourses,
    getInstructorCourses,
    getCourseStudents,
    updateCourse
} = require('../controllers/courseController');
const { authenticate, isInstructor } = require('../middleware/authMiddleware');

// Student routes
router.get('/enrolled', authenticate, getEnrolledCourses); // Get courses student enrolled in

// General routes
router.get('/', authenticate, getCourses); // Get all courses
router.post('/:id/enroll', authenticate, enrollInCourse); // Enroll student in course

// Instructor-only routes
router.get('/instructor', authenticate, isInstructor, getInstructorCourses); // Get instructor's courses
router.post('/', authenticate, isInstructor, createCourse); // Create new course
router.get('/:id/students', authenticate, getCourseStudents); // Get enrolled students for a course
router.put('/:id', authenticate, isInstructor, updateCourse);

module.exports = router;