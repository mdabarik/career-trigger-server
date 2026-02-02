import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { postService } from './posts.services';
import { IPostReaderController } from './posts.interface';
import { isValidStatus } from './posts.validation';
import mongoose from 'mongoose';

class PostController implements IPostReaderController {
    public GetAllPosts = catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            const { limit, searchText, status, categoryId } = req.query;
            const posts = await postService.GetAllPosts({
                limit: limit ? Number(limit) : undefined,
                searchText: searchText ? String(searchText) : undefined,
                status: isValidStatus(status) ? status : undefined,
                categoryId: categoryId ? String(categoryId) : undefined,
            });

            sendResponse(res, {
                success: true,
                message: 'All posts fetched successfully',
                statusCode: httpStatus.OK,
                data: posts,
            });
        },
    );

    public GetPostById = catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                sendResponse(res, {
                    success: false,
                    message: 'Invalid post ID',
                    statusCode: httpStatus.BAD_REQUEST,
                    data: null,
                });
                return;
            }

            const post = await postService.GetPostById(id);

            if (!post) {
                sendResponse(res, {
                    success: false,
                    message: 'Post not found',
                    statusCode: httpStatus.NOT_FOUND,
                    data: null,
                });
                return;
            }

            sendResponse(res, {
                success: true,
                message: 'Post fetched successfully',
                statusCode: httpStatus.OK,
                data: post,
            });
        },
    );

    public GetPostStats = catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            const { id } = req.query;

            // console.log(id, 'id');

            if (id && !mongoose.Types.ObjectId.isValid(id as string)) {
                sendResponse(res, {
                    success: false,
                    message: 'Invalid user ID',
                    statusCode: httpStatus.BAD_REQUEST,
                    data: null,
                });
                return;
            }

            const stats = await postService.GetPostStats(
                id as string | undefined,
            );

            sendResponse(res, {
                success: true,
                message: 'Post stats fetched successfully',
                statusCode: httpStatus.OK,
                data: stats,
            });
        },
    );

    public DeletePostById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedPost = await postService.DeletePostById(id);
        if (!deletedPost) {
            return sendResponse(res, {
                success: false,
                message: 'Category not found',
                statusCode: httpStatus.NOT_FOUND,
                data: null,
            });
        }
        sendResponse(res, {
            success: true,
            message: 'Post deleted successfully',
            statusCode: httpStatus.OK,
            data: deletedPost,
        });
    });
}

export const postController = new PostController();
