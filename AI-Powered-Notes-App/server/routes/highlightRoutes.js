const express = require('express');
const router = express.Router();
const {
  addHighlight,
  deleteHighlight,
  getHighlightsForNote
} = require('../controllers/highlightController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/:noteId', addHighlight);              // Add a highlight to a note
router.delete('/:noteId/:highlightId', deleteHighlight);  // Delete a highlight
router.get('/:noteId', getHighlightsForNote);        // Get all highlights for a note

module.exports = router;
