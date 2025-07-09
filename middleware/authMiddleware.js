const jwt = require('jsonwebtoken');

// Middleware to verify JWT and extract user info
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Middleware to check if user is an instructor
const isInstructor = (req, res, next) => {
    if (req.user.role !== 'instructor') return res.status(403).json({ message: 'Forbidden' });
    next();
};

module.exports = { authenticate, isInstructor };