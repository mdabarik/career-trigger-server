import { Router } from 'express';
import { postController } from './posts.controller';

const router = Router();

router.get('/', postController.GetAllPosts);
router.get('/id/:id', postController.GetPostById);

export const PostRoute = router;
