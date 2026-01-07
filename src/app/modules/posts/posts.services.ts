/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import Post from './posts.model';

const getPosts = async (params: any) => {
    const { status, search, sortById, authorId, page, limit } = params;
    console.log('params', params);

    const query: any = {};

    // console.log(query);

    if (authorId) query.authorId = authorId;
    if (status) query.status = status;
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
        ];
    }

    let postsQuery = Post.find(query).populate('author').populate('category');

    if (sortById) {
        postsQuery = postsQuery.sort({ _id: sortById === 'asc' ? 1 : -1 });
    }

    /* pagination validation */
    const perPage = Number(limit);
    const pageNumber = Number(page);
    if (!Number.isInteger(perPage) || isNaN(perPage) || perPage <= 0) {
        throw new Error(
            'Invalid limit value. Limit must be a positive integer.'
        );
    }
    if (!Number.isInteger(pageNumber) || isNaN(pageNumber) || pageNumber <= 0) {
        throw new Error('Invalid page value. Page must be a positive integer.');
    }

    /* pagination logic start */
    const totalItems = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalItems / perPage);
    if (pageNumber > totalPages && totalPages != 0) {
        throw new Error('Invalid page value. Page does not exists.');
    }
    let skip = (pageNumber - 1) * perPage;
    if (skip < 0) skip = 0;
    /* pagination logic end */

    // console.log('skip', skip);

    postsQuery = postsQuery.skip(skip).limit(perPage);
    const posts = await postsQuery.exec();

    return {
        posts: posts,
        recordCount: totalItems,
        totalPages: totalPages,
    };
};

const createPost = async (payload: any) => {
    const post = await Post.create(payload);
    return post;
};

const updatePost = async (id: string, payload: any) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid post id');
    }

    if (payload.authorId && !Types.ObjectId.isValid(payload.authorId)) {
        throw new Error('Invalid authorId');
    }

    if (payload.categoryId && !Types.ObjectId.isValid(payload.categoryId)) {
        throw new Error('Invalid categoryId');
    }

    const updatedPost = await Post.findByIdAndUpdate(
        new Types.ObjectId(id),
        {
            ...payload,
            authorId: payload.authorId
                ? new Types.ObjectId(payload.authorId)
                : undefined,
            categoryId: payload.categoryId
                ? new Types.ObjectId(payload.categoryId)
                : undefined,
        },
        { new: true }
    )
        .populate('author')
        .populate('category');

    return updatedPost;
};

const getPostById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid post id');
    }
    const post = await Post.findById(new Types.ObjectId(id))
        .populate('author')
        .populate('category');
    return post;
};

const deletePost = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid post id');
    }
    const deletedPost = await Post.findByIdAndDelete(new Types.ObjectId(id));
    return deletedPost;
};

const patchPost = async (id: string, payload: any) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid post id');
    }
    const updateData: any = {};
    if (payload.title) updateData.title = payload.title;
    if (payload.details) updateData.details = payload.details;
    if (payload.photoUrl) updateData.photoUrl = payload.photoUrl;
    if (payload.tags) updateData.tags = payload.tags;
    if (payload.status) updateData.status = payload.status;
    if (payload.like !== undefined) updateData.like = payload.like;
    if (payload.dislike !== undefined) updateData.dislike = payload.dislike;

    if (payload.categoryId && Types.ObjectId.isValid(payload.categoryId)) {
        updateData.categoryId = new Types.ObjectId(payload.categoryId);
    }
    const updatedPost = await Post.findByIdAndUpdate(
        new Types.ObjectId(id),
        { $set: updateData },
        { new: true }
    )
        .populate('author')
        .populate('category');
    return updatedPost;
};

export const PostServices = {
    getPosts,
    createPost,
    updatePost,
    getPostById,
    deletePost,
    patchPost,
};
