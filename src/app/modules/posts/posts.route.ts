import { Router } from 'express';
import { postController } from './posts.controller';
import { authenticate, authorize } from '../auth/auth.middleware';

const router = Router();

router.get('/', postController.GetAllPosts);
router.get('/id/:id', postController.GetPostById);
router.get(
    '/stats',
    authenticate,
    authorize(['user', 'editor', 'admin']),
    postController.GetPostStats,
);
router.delete(
    '/delete/:id',
    authenticate,
    authorize(['user', 'editor', 'admin']),
    postController.DeletePostById,
);
router.post(
    '/create',
    authenticate,
    authorize(['user', 'editor', 'admin']),
    postController.CreatePost,
);

router.put(
    '/update/:id',
    authenticate,
    authorize(['user', 'editor', 'admin']),
    postController.UpdatePost,
);

router.patch(
    '/update-post-status/:id',
    authenticate,
    authorize(['user', 'editor', 'admin']),
    postController.UpdatePostStatus,
);

export const PostRoute = router;
