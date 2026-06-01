const { z } = require('zod');

const idParam = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1).max(100),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

const moduleSchema = z.object({
  body: z.object({
    code: z.string().min(1).max(20),
    name: z.string().min(1).max(200),
    credits: z.string().min(1).max(10),
    semester: z.string().min(1).max(50),
    instructor: z.string().min(1).max(100),
  }),
});

const moduleUpdateSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: moduleSchema.shape.body.partial(),
});

const taskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional().default(''),
    dueDate: z.string().min(1),
    priority: z.enum(['High', 'Medium', 'Low']),
    category: z.string().min(1).max(100),
    completed: z.boolean().optional().default(false),
  }),
});

const taskUpdateSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: taskSchema.shape.body.partial(),
});

const attendanceSchema = z.object({
  body: z.object({
    moduleId: z.number().int().positive(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(['present', 'absent', 'late', 'excused']),
  }),
});

const attendanceQuerySchema = z.object({
  query: z.object({
    moduleId: z.coerce.number().int().positive().optional(),
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }),
});

const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1).max(4000),
  }),
});

const plannerDailySchema = z.object({
  query: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }),
});

const plannerGenerateSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    focusAreas: z.array(z.string()).optional().default([]),
  }),
});

module.exports = {
  idParam,
  registerSchema,
  loginSchema,
  moduleSchema,
  moduleUpdateSchema,
  taskSchema,
  taskUpdateSchema,
  attendanceSchema,
  attendanceQuerySchema,
  chatSchema,
  plannerDailySchema,
  plannerGenerateSchema,
};
