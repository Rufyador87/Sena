import { AuthService } from '../services/auth-service.js';

const authService = new AuthService();

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
