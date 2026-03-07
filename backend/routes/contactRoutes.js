const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createMessage).get(protect, getMessages);
router.route('/:id').put(protect, updateMessageStatus).delete(protect, deleteMessage);

module.exports = router;
