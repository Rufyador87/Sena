import { Router } from 'express';
import { login, register } from '../controllers/auth-controller.js';
import { validateRequiredFields } from '../middlewares/validation.js';

const router = Router();

router.post('/login', validateRequiredFields(['email', 'password']), login);
router.post('/register', validateRequiredFields(['fullName', 'email', 'password', 'role']), register);

export default router;
