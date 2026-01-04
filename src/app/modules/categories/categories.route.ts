import { Router } from 'express';
import { CategoryController } from './categories.controller';
const route = Router();

route.get('/', CategoryController.getCategories);

export const CategoryRoute = route;
