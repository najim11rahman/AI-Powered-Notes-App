const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateSummary = async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: 'Content is required' });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes user notes in 2-3 lines.',
        },
        {
          role: 'user',
          content: `Summarize this note:\n${content}`,
        },
      ],
      temperature: 0.7,
    });

    const summary = response.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (err) {
    console.error('OpenAI Error:', err);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
};
