const { Router } = require('express');
const moduleController = require('../controllers/moduleController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { moduleSchema, moduleUpdateSchema, idParam } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /api/modules:
 *   get:
 *     tags: [Modules]
 *     summary: List all modules
 */
router.get('/', moduleController.list);

/**
 * @openapi
 * /api/modules/{id}:
 *   get:
 *     tags: [Modules]
 *     summary: Get module by ID
 */
router.get('/:id', validate(idParam), moduleController.getById);

router.post('/', validate(moduleSchema), moduleController.create);
router.put('/:id', validate(moduleUpdateSchema), moduleController.update);
router.delete('/:id', validate(idParam), moduleController.remove);

module.exports = router;
