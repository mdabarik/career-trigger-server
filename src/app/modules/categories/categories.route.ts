import { Router } from 'express';
import { CategoryController } from './categories.controller';
const route = Router();

route.get('/', CategoryController.getCategories);
route.post('/', CategoryController.createCategory);
route.put('/:id', CategoryController.updateCategory);
route.delete('/:id', CategoryController.deleteCategory);

export const CategoryRoute = route;
