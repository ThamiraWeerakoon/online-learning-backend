require('dotenv').config();

const { OpenAI } = require('openai');
const Course = require('../models/Course'); //
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const recommendCourses = async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('📨 Prompt from user:', prompt);

        const courses = await Course.find().select('title description');
        const courseList = courses.map(course => `- ${course.title}: ${course.description}`).join('\n');

        const fullPrompt = `
The following courses are available on our platform:

${courseList}

Based on this list and the user's goal: "${prompt}",
please suggest the most relevant courses from this list and briefly explain why.
`;

        console.log('🧠 Sending full prompt to OpenAI...');
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [{ role: 'user', content: fullPrompt }]
        });

        console.log('✅ GPT Response:', response.choices[0].message.content);
        res.json({ reply: response.choices[0].message.content });

    } catch (err) {
        console.error('❌ GPT ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { recommendCourses };