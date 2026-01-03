import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PostServices } from './posts.services';

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const posts = await PostServices.getAllPosts();

    sendResponse(res, {
        success: true,
        message: 'All posts fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});

export const PostControllers = {
    getAllPosts,
};
