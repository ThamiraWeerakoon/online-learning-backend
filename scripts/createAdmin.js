const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        const username = 'admin';
        const password = 'admin123'; // Change after first login
        const existing = await User.findOne({ username });

        if (existing) {
            console.log('⚠️ Admin user already exists.');
        } else {
            const hashed = await bcrypt.hash(password, 10);
            const admin = new User({ username, password: hashed, role: 'admin' });
            await admin.save();
            console.log(`✅ Admin user created: ${username}`);
        }
    } catch (err) {
        console.error('❌ Failed to create admin:', err);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
