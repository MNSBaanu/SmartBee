const { Router } = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/schemas');

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     security: []
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout current session
 */
router.post('/logout', authenticate, authController.logout);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user
 */
router.get('/me', authenticate, authController.me);

module.exports = router;
