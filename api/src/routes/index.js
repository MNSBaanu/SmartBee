const { Router } = require('express');
const authRoutes = require('./authRoutes');
const moduleRoutes = require('./moduleRoutes');
const taskRoutes = require('./taskRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const chatRoutes = require('./chatRoutes');
const plannerRoutes = require('./plannerRoutes');
const { query } = require('../config/database');

const router = Router();

router.get('/health', async (_req, res) => {
  let database = false;
  try {
    await query('SELECT 1');
    database = true;
  } catch {}
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database,
    },
  });
});

router.use('/auth', authRoutes);
router.use('/modules', moduleRoutes);
router.use('/tasks', taskRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/chat', chatRoutes);
router.use('/planner', plannerRoutes);

module.exports = router;
