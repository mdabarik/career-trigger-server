import { Router } from 'express';
import { categoryController } from './categories.controller';
const route = Router();

route.get('/', categoryController.GetAllCategory);
route.get('/id/:id', categoryController.GetCategoryById);

export const CategoryRoute = route;
