import { Model, Types } from 'mongoose';
import {
    IGetAllPostsQuery,
    IPostDTO,
    IPostReaderService,
} from './posts.interface';
import Post, { IPostDocument } from './posts.model';
import { PostStats, TPopulatedPost } from './posts.types';
import mongoose from 'mongoose';

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

    async DeletePostById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid category id');
        }
        const post = await Post.findById(id);
        if (!post) {
            return null;
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        return deletedPost;
    }

    async CreatePost(payload: any) {
        const { title, description, photoUrl, authorId, categoryId } = payload;
        const authorObjectId = new mongoose.Types.ObjectId(authorId);
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        const post = await Post.create({
            title,
            description,
            photoUrl,
            authorId: authorObjectId,
            categoryId: categoryObjectId,
        });
        return post;
    }

    async UpdatePost(id: string, payload: any) {
        const { title, description, photoUrl, authorId, categoryId } = payload;
        const authorObjectId = new mongoose.Types.ObjectId(authorId);
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid post id');
        }

        const postExists = await Post.findById(id);
        if (!postExists) {
            return null;
        }

        const updatePost = {
            title,
            description,
            photoUrl,
            authorId: authorObjectId,
            categoryId: categoryObjectId,
        };

        const post = await Post.findByIdAndUpdate(id, updatePost, {
            new: true,
            runValidators: true,
        });
        return post;
    }

    async UpdatePostStatus(id: string, payload: any) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid post id');
        }
        const postExists = await Post.findById(id);
        if (!postExists) {
            return null;
        }
        const post = await Post.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return post;
    }
}

export const postService = new PostService(Post);
