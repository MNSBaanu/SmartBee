const { Router } = require('express');
const plannerController = require('../controllers/plannerController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { plannerDailySchema, plannerGenerateSchema } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

router.get('/daily', validate(plannerDailySchema), plannerController.daily);
router.post('/generate', validate(plannerGenerateSchema), plannerController.generate);

module.exports = router;
