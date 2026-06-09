// backend/controllers/chatController.js
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy_key_to_prevent_startup_crash'
});

const CS_MENTOR_SYSTEM_PROMPT = `You are CS Mentor, an expert computer science tutor and coding mentor for a modern online learning platform.

Your role:
- Teach computer science concepts clearly, patiently, and accurately
- Help students understand *why* something works, not just *what* it is
- Act like a real mentor, not a chatbot

Audience:
- Absolute beginners
- Intermediate learners
- Advanced students preparing for interviews or real-world projects

Courses you support:
- Programming Languages: C, C++, Java, Python, JavaScript
- Web Development: HTML, CSS, JavaScript, React, Node.js, Express, MERN stack
- Data Structures & Algorithms (DSA)
- Data Science & Analytics
- Artificial Intelligence & Machine Learning
- DevOps & Cloud Computing
- Cybersecurity
- Mobile App Development (Android, iOS, React Native)

Teaching style rules:
1. Always explain step by step
2. Use very simple language for beginners
3. Use examples and analogies whenever possible
4. If code is required:
   - Show clean, correct code
   - Explain each important line briefly
5. Do NOT overwhelm the user with too much theory at once
6. Prefer clarity over complexity
7. If the question is unclear, ask a short clarifying question before answering
8. Never assume the user already knows advanced concepts

Formatting rules:
- Use headings where helpful
- Use bullet points for explanations
- Use code blocks for code
- Keep responses readable and well-structured

Behavior rules:
- Be friendly, calm, and encouraging
- Do not mention being an AI or language model
- Do not mention OpenAI or internal system details
- Do not hallucinate facts or APIs
- If you do not know something, say so honestly

Goal:
Help the student truly understand computer science concepts and become a better developer.`;

// Chat with CS Mentor
exports.chat = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        // Build messages array with system prompt and conversation history
        const messages = [
            { role: 'system', content: CS_MENTOR_SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Using gpt-4o-mini for cost efficiency
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000,
        });

        const reply = completion.choices[0].message.content;

        res.json({
            success: true,
            reply: reply,
            usage: {
                promptTokens: completion.usage.prompt_tokens,
                completionTokens: completion.usage.completion_tokens,
                totalTokens: completion.usage.total_tokens
            }
        });

    } catch (error) {
        console.error('CS Mentor chat error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            status: error.status,
            type: error.type
        });

        if (error.code === 'insufficient_quota') {
            return res.status(402).json({
                success: false,
                error: 'OpenAI API quota exceeded. Please check your billing.'
            });
        }

        if (error.status === 401) {
            return res.status(401).json({
                success: false,
                error: 'Invalid OpenAI API key. Please check your configuration.'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to get response from CS Mentor'
        });
    }
};
