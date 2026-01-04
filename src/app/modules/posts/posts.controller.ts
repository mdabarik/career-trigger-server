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

    sendResponse(res, {
        success: true,
        message: 'All posts fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});

export const PostControllers = {
    getPosts,
    getPostsByAuthor,
};
