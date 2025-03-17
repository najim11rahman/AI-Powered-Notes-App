const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  importance: {
    type: Number,
    default: 3,
  },
  type: {
    type: String,
    enum: ['point', 'quote', 'fact', 'action'],
    default: 'point',
  },
}, { timestamps: true });

module.exports = mongoose.model('Highlight', highlightSchema);
