import { Router } from 'express';
import { PostRoute } from '../modules/posts/posts.route';
import { UserRoute } from '../modules/users/users.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
