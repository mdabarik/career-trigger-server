import { Router } from 'express';
import { UserController } from './users.controller';
const route = Router();

route.get('/', UserController.getUsers);
route.get('/:id/user', UserController.getUserById);
route.get('/user', UserController.getUserByEmail);
route.post('/', UserController.createUser);
route.put('/:id', UserController.updateUser);

export const UserRoute = route;
