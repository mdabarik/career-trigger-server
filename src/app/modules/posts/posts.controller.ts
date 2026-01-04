import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PostServices } from './posts.services';
import { Types } from 'mongoose';

const getPosts = catchAsync(async (req: Request, res: Response) => {
    const posts = await PostServices.getPosts({ ...req.query });

    sendResponse(res, {
        success: true,
        message: 'All posts fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});

const getPostsByAuthor = catchAsync(async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req?.params?.id)) {
        return sendResponse(res, {
            success: false,
            message: 'Invalid authorId',
            statusCode: httpStatus.BAD_REQUEST,
            data: null,
        });
    }

    const posts = await PostServices.getPosts({
        ...req.query,
        authorId: new Types.ObjectId(req.params.id),
    });

    console.log('inside controllers', posts);

    sendResponse(res, {
        success: true,
        message: 'All posts fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});

const createPost = async (payload: any) => {
    if (!payload.authorId || !Types.ObjectId.isValid(payload.authorId)) {
        throw new Error('Invalid authorId');
    }
    const authorObjectId = new Types.ObjectId(payload.authorId);

    if (!payload.categoryId || !Types.ObjectId.isValid(payload.categoryId)) {
        throw new Error('Invalid category id');
    }
    const categoryObjectId = new Types.ObjectId(payload.categoryId);

    const post = await PostServices.createPost({
        ...payload,
        authorId: authorObjectId,
        categoryId: categoryObjectId,
    });
    return post;
};

const updatePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostServices.updatePost(id, req.body);
    sendResponse(res, {
        success: true,
        message: 'Post updated successfully',
        statusCode: httpStatus.OK,
        data: post,
    });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostServices.getPostById(id);
    sendResponse(res, {
        success: true,
        message: 'Post fetched successfully',
        statusCode: httpStatus.OK,
        data: post,
    });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostServices.deletePost(id);
    sendResponse(res, {
        success: true,
        message: post ? 'Post deleted successfully' : 'Post not found',
        statusCode: httpStatus.OK,
        data: post,
    });
});

const patchPost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostServices.patchPost(id, req.body);
    sendResponse(res, {
        success: true,
        message: 'Post partially updated successfully',
        statusCode: httpStatus.OK,
        data: post,
    });
});

export const PostControllers = {
    getPosts,
    getPostsByAuthor,
    createPost,
    updatePost,
    getPostById,
    deletePost,
    patchPost,
};
