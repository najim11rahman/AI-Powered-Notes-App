const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  regenerateSummary
} = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', createNote);                    // Create note with summary
router.get('/', getNotes);                       // Get all notes for user
router.get('/:id', getNoteById);                 // Get single note
router.put('/:id', updateNote);                  // Update note content
router.delete('/:id', deleteNote);               // Delete a note
router.post('/:id/regenerate-summary', regenerateSummary);  // Regenerate summary

module.exports = router;
