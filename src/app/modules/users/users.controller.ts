import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './users.service';

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const posts = await UserService.getUsers();

    sendResponse(res, {
        success: true,
        message: 'All users fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});

export const UserController = {
    getUsers,
};
