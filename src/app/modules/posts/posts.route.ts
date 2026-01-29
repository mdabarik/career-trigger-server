import { Router } from 'express';
import { PostController } from './posts.controller';

const router = Router();

router.get('/posts', PostController.GetAllPosts);
router.get('/posts/:id', PostController.GetPostById);

export default router;
