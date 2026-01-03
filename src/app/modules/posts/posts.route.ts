import { Router } from 'express';
import { PostControllers } from './posts.controller';
const route = Router();

route.get('/', PostControllers.getAllPosts);

export const PostRoute = route;
