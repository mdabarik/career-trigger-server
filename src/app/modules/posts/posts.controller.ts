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
    const post = await PostServices.createPost({
        ...payload,
        authorId: authorObjectId,
    });
    return post;
};

export const PostControllers = {
    getPosts,
    getPostsByAuthor,
    createPost,
};
