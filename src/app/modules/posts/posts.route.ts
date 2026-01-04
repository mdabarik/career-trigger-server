import { Router } from 'express';
import { PostControllers } from './posts.controller';
const route = Router();

route.post('/', PostControllers.createPost);
route.get('/', PostControllers.getPosts);
route.get('/authors/:id/posts', PostControllers.getPostsByAuthor);
route.get('/:id', PostControllers.getPostById);
route.put('/:id', PostControllers.updatePost);
route.delete('/:id', PostControllers.deletePost);
route.patch('/:id', PostControllers.patchPost);

export const PostRoute = route;
