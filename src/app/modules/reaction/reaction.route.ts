import { Router } from 'express';
import { ReactionControllers } from './reaction.controller';

const router = Router();

router.patch('/:id/react', ReactionControllers.reactToPost);

export const ReactionRoutes = router;
