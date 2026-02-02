import { Router } from 'express';
import { categoryController } from './categories.controller';
const route = Router();

route.get('/', categoryController.GetAllCategory);
route.get('/id/:id', categoryController.GetCategoryById);
route.get('/cat-stats', categoryController.GetCatStats);

export const CategoryRoute = route;
