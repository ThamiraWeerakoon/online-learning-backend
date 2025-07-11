const jwt = require('jsonwebtoken');
const User = require('../models/User'); // import User model

// Middleware to verify JWT and extract user info
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user;
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

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = decoded;
    next();
};

module.exports = { authenticate, isInstructor, verifyAdmin };