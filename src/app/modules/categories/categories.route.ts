import { Router } from 'express';
import { categoryController } from './categories.controller';
import { authenticate, authorize } from '../auth/auth.middleware';
const route = Router();

route.get('/', categoryController.GetAllCategory);
route.get('/id/:id', categoryController.GetCategoryById);
route.get('/cat-stats', categoryController.GetCatStats);
route.post(
    '/create-cat',
    // authenticate,
    // authorize(['admin']),
    categoryController.CreateCategory,
);
route.put(
    '/update-cat/:id',
    authenticate,
    authorize(['admin']),
    categoryController.UpdateCategory,
);
route.delete(
    '/del-cat/:id',
    authenticate,
    authorize(['admin']),
    categoryController.DeleteCategory,
);

export const CategoryRoute = route;
