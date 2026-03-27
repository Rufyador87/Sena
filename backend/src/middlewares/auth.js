import { verifyToken } from '../utils/security.js';

export const requireAuth = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next({ statusCode: 401, message: 'Token requerido' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    return next();
  } catch (_error) {
    return next({ statusCode: 401, message: 'Token inválido o expirado' });
  }
};

export const allowRoles = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next({ statusCode: 403, message: 'No autorizado para este recurso' });
  }
  return next();
};
