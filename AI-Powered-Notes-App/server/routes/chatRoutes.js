// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.getMessages);
router.post('/', chatController.sendMessage);
router.post('/clear', chatController.clearMessages);

module.exports = router;
