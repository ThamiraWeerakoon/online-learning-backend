const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { createInstructor, getAllUsers } = require('../controllers/authController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.post('/register', register); // POST /api/auth/register
router.post('/login', login);       // POST /api/auth/login
router.post('/create-instructor', verifyAdmin, createInstructor);
router.get('/users', verifyAdmin, getAllUsers);

module.exports = router;