import { RequestHandler } from 'express';
import { PostStatus } from './posts.types';

export interface IPostDTO {
    _id: string;
    title: string;
    photoUrl: string;
    description: string;
    status: PostStatus;
    categoryName: string;
    authorId: string;
    authorName: string;
}

export interface IPostReaderService {
    GetAllPosts(query: IGetAllPostsQuery): Promise<IPostDTO[]>;
    GetPostById(id: string): Promise<IPostDTO | null>;
}

export interface IGetAllPostsQuery {
    limit?: number;
    searchText?: string;
    status?: PostStatus;
    categoryId?: string;
}

export interface IPostReaderController {
    GetAllPosts: RequestHandler;
    GetPostById: RequestHandler;
}
