import { Router } from 'express';
import { UserController } from './users.controller';
const route = Router();

route.get('/', UserController.getUsers);

export const UserRoute = route;
