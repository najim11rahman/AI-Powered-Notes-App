// routes/chatRoutes.js
const express = require('express');
const axios = require('axios');
const Message = require('../models/Message');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }); 
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Message is required');
  }

  try {
    const userMessage = new Message({ sender: 'You', text: message });
    await userMessage.save();

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: `User message: ${message}`,
      stream: false,
    });

    const ollamaResponse = new Message({
      sender: 'Ollama',
      text: response.data.response.trim(),
    });
    await ollamaResponse.save();

    res.json({ reply: response.data.response.trim() });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

module.exports = router;
