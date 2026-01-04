import { Router } from 'express';
import { PostControllers } from './posts.controller';
const route = Router();

route.get('/', PostControllers.getPosts);
route.get('/authors/:id/posts', PostControllers.getPostsByAuthor);

export const PostRoute = route;
