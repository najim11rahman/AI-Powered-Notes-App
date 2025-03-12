const express = require('express');
const { generateSummary } = require('../controllers/aiController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/summarize', protect, generateSummary);

module.exports = router;
