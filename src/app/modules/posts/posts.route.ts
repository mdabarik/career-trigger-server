import { Router } from 'express';
import { postController } from './posts.controller';

const router = Router();

router.get('/posts', postController.GetAllPosts);
router.get('/posts/:id', postController.GetPostById);

export default router;
