const express = require('express');
const router = express.Router();
const { recommendCourses } = require('../controllers/chatController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/recommend', authenticate, recommendCourses); // POST course recommendations

module.exports = router;