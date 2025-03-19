const axios = require('axios');
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
};

exports.sendMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Message is required');
  }

  try {
    const userMessage = new Message({
      user: req.user.id,
      sender: 'You',
      text: message,
    });
    await userMessage.save();

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: `User message: ${message}`,
      stream: false,
    });

    const botMessage = new Message({
      user: req.user.id,
      sender: 'Bot',
      text: response.data.response.trim(),
    });
    await botMessage.save();

    res.json({ reply: response.data.response.trim() });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
};

exports.clearMessages = async (req, res) => {
  try {
    await Message.deleteMany({ user: req.user.id });
    res.status(200).send('Messages cleared');
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).send('Failed to clear messages');
  }
};
