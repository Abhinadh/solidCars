const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin } = require('../controllers/adminController');

router.post('/login', authAdmin);
router.post('/setup', registerAdmin); // In production, this should be protected or removed

module.exports = router;
