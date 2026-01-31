import { Router } from 'express';
import { postController } from './posts.controller';
import { authenticate } from '../auth/auth.middleware';

const router = Router();

router.get('/', authenticate, postController.GetAllPosts);
router.get('/id/:id', postController.GetPostById);

export const PostRoute = router;
