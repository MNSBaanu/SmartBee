const { Router } = require('express');
const authRoutes = require('./authRoutes');
const moduleRoutes = require('./moduleRoutes');
const taskRoutes = require('./taskRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const chatRoutes = require('./chatRoutes');
const plannerRoutes = require('./plannerRoutes');
const { isSupabaseConfigured } = require('../config/database');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      supabase: isSupabaseConfigured(),
    },
  });
});

router.use('/auth', authRoutes);
router.use('/modules', moduleRoutes);
router.use('/tasks', taskRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/chat', chatRoutes);
router.use('/planner', plannerRoutes);

module.exports = router;
