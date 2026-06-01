const { Router } = require('express');
const attendanceController = require('../controllers/attendanceController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { attendanceSchema, attendanceQuerySchema } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

router.get('/stats', attendanceController.stats);
router.get('/', validate(attendanceQuerySchema), attendanceController.list);
router.post('/', validate(attendanceSchema), attendanceController.record);

module.exports = router;
