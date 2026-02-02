import { Model, Types } from 'mongoose';
import {
    IGetAllPostsQuery,
    IPostDTO,
    IPostReaderService,
} from './posts.interface';
import Post, { IPostDocument } from './posts.model';
import { PostStats, TPopulatedPost } from './posts.types';

class PostService implements IPostReaderService {
    constructor(private postModel: Model<IPostDocument>) {}
    async GetAllPosts(query: IGetAllPostsQuery): Promise<IPostDTO[]> {
        const { limit, searchText, status, categoryId } = query;
        const filter: Record<string, unknown> = {};

        if (status) filter.status = status;
        if (searchText) filter.title = { $regex: searchText, $options: 'i' };
        if (categoryId) filter.categoryId = categoryId;

        // console.log(filter, 'inside postservices');

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

    // async GetPostStats(id?: string) {
    //     const filter: any = {};
    //     if (id) {
    //         filter.id = id;
    //     }
    //     const total = await Post.countDocuments(filter);
    //     const pending = await Post.countDocuments({
    //         ...filter,
    //         status: 'pending',
    //     });
    //     const declined = await Post.countDocuments({
    //         ...filter,
    //         status: 'declined',
    //     });
    //     const published = await Post.countDocuments({
    //         ...filter,
    //         status: 'published',
    //     });
    //     return { total, pending, declined, published };
    // }

    async GetPostStats(authorId?: string): Promise<PostStats> {
        if (authorId && !Types.ObjectId.isValid(authorId)) {
            return { total: 0, pending: 0, declined: 0, published: 0 };
        }

        const baseFilter: any = {};
        if (authorId) {
            baseFilter.authorId = new Types.ObjectId(authorId);
        }

        const [total, pending, declined, published] = await Promise.all([
            Post.countDocuments(baseFilter),
            Post.countDocuments({ ...baseFilter, status: 'pending' }),
            Post.countDocuments({ ...baseFilter, status: 'declined' }),
            Post.countDocuments({ ...baseFilter, status: 'published' }),
        ]);

        return { total, pending, declined, published };
    }
}

export const postService = new PostService(Post);
