import { RequestHandler } from 'express';

export interface IPostDTO {
    title: string;
    categoryId: string;
    photoUrl: string;
    description: string;
    authorId: string;
    status: 'declined' | 'published' | 'pending';
}

export interface IPostReaderService {
    GetAllPosts(): Promise<IPostDTO[]>;
    GetPostById(id: string): Promise<IPostDTO | null>;
}

export interface IPostReaderController {
    GetAllPosts: RequestHandler;
    GetPostById: RequestHandler;
}
