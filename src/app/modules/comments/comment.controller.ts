import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await CommentServices.createComment(req.body);
    sendResponse(res, {
        success: true,
        message: 'Comment created successfully',
        statusCode: httpStatus.CREATED,
        data: comment,
    });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await CommentServices.updateComment(id, req.body);
    sendResponse(res, {
        success: !!updated,
        message: updated ? 'Comment updated successfully' : 'Comment not found',
        statusCode: updated ? httpStatus.OK : httpStatus.NOT_FOUND,
        data: updated,
    });
});

const getCommentsByPostId = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const comments = await CommentServices.getCommentsByPostId(postId);
    sendResponse(res, {
        success: true,
        message: 'Comments fetched successfully',
        statusCode: httpStatus.OK,
        data: comments,
    });
});

const getCommentsByUserId = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const comments = await CommentServices.getCommentsByUserId(userId);
    sendResponse(res, {
        success: true,
        message: 'Comments fetched successfully',
        statusCode: httpStatus.OK,
        data: comments,
    });
});

const getAllComments = catchAsync(async (req: Request, res: Response) => {
    const result = await CommentServices.getAllComments(req.query);
    sendResponse(res, {
        success: true,
        message: 'All comments fetched successfully',
        statusCode: httpStatus.OK,
        data: result,
    });
});

export const CommentControllers = {
    createComment,
    updateComment,
    getCommentsByPostId,
    getCommentsByUserId,
    getAllComments,
};
