import { Router } from 'express';
import { UserController } from './users.controller';
import { authenticate, authorize } from '../auth/auth.middleware';
const route = Router();

route.get(
    '/user-stats',
    authenticate,
    authorize(['admin']),
    UserController.countUsers,
);

export const UserRoute = route;
