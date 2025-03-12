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
    type: Number, // from 1 to 5, where 5 is most important
    default: 3,
  },
  type: {
    type: String,
    enum: ['point', 'quote', 'fact', 'action'],
    default: 'point',
  },
}, { timestamps: true });

module.exports = mongoose.model('Highlight', highlightSchema);
