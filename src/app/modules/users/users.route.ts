import { Router } from 'express';
import { authenticate, authorize } from '../auth/auth.middleware';
import { userController } from './users.controller';
const route = Router();

route.get(
    '/user-stats',
    authenticate,
    authorize(['admin']),
    userController.countUsers,
);

route.get(
    '/all-users',
    authenticate,
    authorize(['admin']),
    userController.countUsers,
);

export const UserRoute = route;
