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

router.post('/', createNote);                    
router.get('/', getNotes);                       
router.get('/:id', getNoteById);                 
router.put('/:id', updateNote);                  
router.delete('/:id', deleteNote);               
router.post('/:id/regenerate-summary', regenerateSummary); 

module.exports = router;
