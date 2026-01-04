import { Router } from 'express';
import { CommentControllers } from './comment.controller';

const router = Router();

router.post('/', CommentControllers.createComment);
router.put('/:id', CommentControllers.updateComment);
router.get('/', CommentControllers.getAllComments);
router.get('/post/:postId', CommentControllers.getCommentsByPostId);
router.get('/user/:userId', CommentControllers.getCommentsByUserId);

export const CommentRoutes = router;
