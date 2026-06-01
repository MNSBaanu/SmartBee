const { Router } = require('express');
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { taskSchema, taskUpdateSchema, idParam } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

router.get('/', taskController.list);
router.get('/:id', validate(idParam), taskController.getById);
router.post('/', validate(taskSchema), taskController.create);
router.put('/:id', validate(taskUpdateSchema), taskController.update);
router.delete('/:id', validate(idParam), taskController.remove);

module.exports = router;
