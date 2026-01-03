import { Router } from 'express';
import { PostRoute } from '../modules/posts/posts.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/posts',
        route: PostRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
