const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Unread',
    enum: ['Unread', 'Read', 'Replied']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
