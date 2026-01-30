import { RequestHandler } from 'express';
import { PostStatus } from './posts.types';

export interface IPostDTO {
    title: string;
    categoryId: string;
    photoUrl: string;
    description: string;
    authorId: string;
    status: PostStatus;
}

export interface IPostReaderService {
    GetAllPosts(query: IGetAllPostsQuery): Promise<IPostDTO[]>;
    GetPostById(id: string): Promise<IPostDTO | null>;
}

export interface IGetAllPostsQuery {
    limit?: number;
    searchText?: string;
    status?: PostStatus;
}

export interface IPostReaderController {
    GetAllPosts: RequestHandler;
    GetPostById: RequestHandler;
}
