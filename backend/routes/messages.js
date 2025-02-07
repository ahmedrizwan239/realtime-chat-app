const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMessages } = require('../controllers/messageController');

// GET /messages/:userId
router.get('/:userId', auth, getMessages);

module.exports = router;