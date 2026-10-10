const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const err = new Error('Validation failed');
    err.statusCode = 400;
    err.isOperational = true;
    err.errors = result.error.flatten();
    return next(err);
  }

  const { body, query, params } = result.data;
  if (body !== undefined) req.body = body;
  if (query !== undefined) req.query = query;
  if (params !== undefined) req.params = params;
  next();
};

module.exports = validate;
