import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ReactionServices } from './reaction.services';

const reactToPost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, action } = req.body;

    const post = await ReactionServices.reactToPost(id, userId, action);

    sendResponse(res, {
        success: true,
        message: `Post ${action} updated successfully`,
        statusCode: httpStatus.OK,
        data: post,
    });
});

export const ReactionControllers = { reactToPost };
