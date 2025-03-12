const Note = require('../models/Note');
const generateSummary = require('../utils/generateSummary');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const summary = await generateSummary(content);

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      summary,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

exports.regenerateSummary = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const newSummary = await generateSummary(note.content);
    note.summary = newSummary;
    await note.save();

    res.json({ message: 'Summary regenerated', summary: newSummary });
  } catch (err) {
    res.status(500).json({ message: 'Failed to regenerate summary' });
  }
};
