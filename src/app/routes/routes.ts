import { Router } from 'express';
import { UserRoute } from '../modules/users/users.route';
import { CategoryRoute } from '../modules/categories/categories.route';
import { PostRoute } from '../modules/posts/posts.route';
import { AuthRoute } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
    { path: '/posts', route: PostRoute },
    { path: '/users', route: UserRoute },
    { path: '/categories', route: CategoryRoute },
    { path: '/auth', route: AuthRoute },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
