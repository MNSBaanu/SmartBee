const { Router } = require('express');
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { chatSchema } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

router.post('/', validate(chatSchema), chatController.send);
router.get('/history', chatController.history);

module.exports = router;
