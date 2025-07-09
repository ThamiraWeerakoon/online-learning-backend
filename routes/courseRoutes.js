const express = require('express');
const router = express.Router();
const { createCourse, getCourses, enrollInCourse, getEnrolledCourses } = require('../controllers/courseController');
const { authenticate, isInstructor } = require('../middleware/authMiddleware');

router.get('/', authenticate, getCourses); // GET all courses
router.post('/', authenticate, isInstructor, createCourse); // POST new course
router.post('/:id/enroll', authenticate, enrollInCourse); // Enroll student
router.get('/enrolled', authenticate, getEnrolledCourses); // GET student's enrolled courses

module.exports = router;