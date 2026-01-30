import { Model } from 'mongoose';
import {
    IGetAllPostsQuery,
    IPostDTO,
    IPostReaderService,
} from './posts.interface';
import Post, { IPostDocument } from './posts.model';
import { TPopulatedPost } from './posts.types';

class PostService implements IPostReaderService {
    constructor(private postModel: Model<IPostDocument>) {}
    async GetAllPosts(query: IGetAllPostsQuery): Promise<IPostDTO[]> {
        const { limit, searchText, status } = query;
        const filter: Record<string, unknown> = {};

        if (status) filter.status = status;
        if (searchText) filter.title = { $regex: searchText, $options: 'i' };

        let postsQuery = this.postModel
            .find(filter)
            .select('title photoUrl description status authorId categoryId')
            .populate('author', 'name')
            .populate('category', 'name')
            .lean<TPopulatedPost[]>();

        if (limit) postsQuery = postsQuery.limit(limit);

        const posts = await postsQuery;

        // aggreate function db te use kore optimized kora jai
        return posts.map((post) => ({
            _id: post._id.toString(),
            title: post.title,
            photoUrl: post.photoUrl,
            description: post.description,
            status: post.status,
            authorId: post.authorId,
            authorName: post?.author?.name,
            categoryName: post?.category?.name,
        }));
    }

    async GetPostById(id: string): Promise<IPostDTO | null> {
        const post = await this.postModel
            .findById(id)
            .select('title photoUrl description status authorId categoryId')
            .populate('author', 'name')
            .populate('category', 'name')
            .lean<TPopulatedPost | null>();

        if (post == null) return null;

        return {
            _id: post._id.toString(),
            title: post.title,
            photoUrl: post.photoUrl,
            description: post.description,
            status: post.status,
            authorId: post.author._id,
            authorName: post?.author?.name,
            categoryName: post?.category?.name,
        };
    }
}

export const postService = new PostService(Post);
