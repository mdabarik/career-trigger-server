import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { postService } from './posts.services';
import { IPostReaderController } from './posts.interface';

class PostController implements IPostReaderController {
    public GetAllPosts = catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            const posts = await postService.GetAllPosts();
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
            const post = await postService.GetPostById(id);
            sendResponse(res, {
                success: true,
                message: 'Post fetched successfully',
                statusCode: httpStatus.OK,
                data: post,
            });
        },
    );
}

export const postController = new PostController();
