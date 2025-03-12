const Note = require('../models/Note');

exports.addHighlight = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { text } = req.body;

    const note = await Note.findOne({ _id: noteId, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.highlights.push({ text });
    await note.save();

    res.status(201).json({ message: 'Highlight added', highlights: note.highlights });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add highlight', error: err.message });
  }
};

exports.deleteHighlight = async (req, res) => {
  try {
    const { noteId, highlightId } = req.params;

    const note = await Note.findOne({ _id: noteId, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.highlights = note.highlights.filter(h => h._id.toString() !== highlightId);
    await note.save();

    res.json({ message: 'Highlight deleted', highlights: note.highlights });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete highlight', error: err.message });
  }
};

exports.getHighlightsForNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.noteId, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json(note.highlights);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get highlights', error: err.message });
  }
};
