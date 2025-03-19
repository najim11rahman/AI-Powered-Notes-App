const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, chatController.getMessages);
router.post('/', protect, chatController.sendMessage);
router.post('/clear', protect, chatController.clearMessages);

module.exports = router;
