const { Router } = require('express');
const scheduleController = require('../controllers/scheduleController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { scheduleSchema, scheduleUpdateSchema, idParam } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

router.get('/', scheduleController.list);
router.get('/:id', validate(idParam), scheduleController.getById);
router.post('/', validate(scheduleSchema), scheduleController.create);
router.put('/:id', validate(scheduleUpdateSchema), scheduleController.update);
router.delete('/:id', validate(idParam), scheduleController.remove);

module.exports = router;
