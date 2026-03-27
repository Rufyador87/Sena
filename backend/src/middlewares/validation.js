export const validateRequiredFields = (requiredFields) => (req, _res, next) => {
  const missingFields = requiredFields.filter((field) => {
    const value = req.body[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    return next({
      statusCode: 400,
      message: `Campos requeridos faltantes: ${missingFields.join(', ')}`
    });
  }

  return next();
};
