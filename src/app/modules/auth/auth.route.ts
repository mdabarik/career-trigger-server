import { Router } from 'express';
import {
    validateLogin,
    validateRefreshToken,
    validateRegister,
} from './auth.validation';
import { authController } from './auth.controller';

const router = Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);

export default router;
