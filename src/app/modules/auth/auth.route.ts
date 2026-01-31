import { Router } from 'express';
import { validateLogin, validateRegister } from './auth.validation';
import { authController } from './auth.controller';

const router = Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

export default router;
