const express = require('express');
const router = express.Router();
const {
  addHighlight,
  deleteHighlight,
  getHighlightsForNote
} = require('../controllers/highlightController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/:noteId', addHighlight);              
router.delete('/:noteId/:highlightId', deleteHighlight);  
router.get('/:noteId', getHighlightsForNote);       

module.exports = router;
