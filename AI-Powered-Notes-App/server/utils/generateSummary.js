//ChatGPT

// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure this is defined in your .env
// });

// module.exports = async function generateSummary(content) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful assistant that summarizes text concisely.',
//         },
//         {
//           role: 'user',
//           content: `Please summarize the following note:\n\n${content}`,
//         },
//       ],
//       max_tokens: 100,
//       temperature: 0.5,
//     });

//     const summary = response.choices[0].message.content.trim();
//     return summary;
//   } catch (error) {
//     console.error('Error generating summary:', error.response?.data || error.message);
//     throw new Error('Failed to generate summary from OpenAI');
//   }
// };


//Ollama
const axios = require('axios');

module.exports = async function generateSummary(content) {
  try {
    const res = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: `Please summarize the following note:\n\n${content}`,
      stream: false,
    });

    return res.data.response.trim();
  } catch (error) {
    console.error('Error generating local summary:', error.message);
    throw new Error('Failed to generate summary using local LLM');
  }
};

 //GoogleAI
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // store safely in .env

// async function generateSummary(content) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(`Summarize this note:\n\n${content}`);
//     const response = await result.response;
//     const text = response.text();

//     return text.trim();
//   } catch (err) {
//     console.error("Gemini Summary Error:", err.message);
//     throw new Error("Failed to summarize with Gemini");
//   }
// }

// module.exports = generateSummary;

