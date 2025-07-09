const { OpenAI } = require('openai');
const Course = require('../models/Course'); //
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const recommendCourses = async (req, res) => {
    try {
        const { prompt } = req.body;

        // Get all available courses
        const courses = await Course.find().select('title description');
        const courseList = courses.map(course => `- ${course.title}: ${course.description}`).join('\n');

        // Full prompt with course list
        const fullPrompt = `
The following courses are available on our platform:

${courseList}

Based on this list and the user's goal: "${prompt}",
please suggest the most relevant courses from this list and briefly explain why.
    `;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: fullPrompt }]
        });

        res.json({ reply: response.choices[0].message.content });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { recommendCourses };