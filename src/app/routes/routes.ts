import { Router } from 'express';
import { PostRoute } from '../modules/posts/posts.route';
import { UserRoute } from '../modules/users/users.route';
import { CategoryRoute } from '../modules/categories/categories.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/posts',
        route: PostRoute,
    },
    {
        path: '/users',
        route: UserRoute,
    },
    {
        path: '/categories',
        route: CategoryRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
