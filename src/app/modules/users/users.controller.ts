import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import usersService from './users.service';

class UserController {
    public getUserById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await usersService.getUserById(id);
        sendResponse(res, {
            success: true,
            message: 'User retrieved successfully',
            statusCode: httpStatus.OK,
            data: user,
        });
    });

    public GetAllUsers = catchAsync(async (req: Request, res: Response) => {
        const users = await usersService.GetAllUsers();
        sendResponse(res, {
            success: true,
            message: 'All users retrieved successfully',
            statusCode: httpStatus.OK,
            data: users,
        });
    });

    public countUsers = catchAsync(async (req: Request, res: Response) => {
        const count = await usersService.countUsers();
        sendResponse(res, {
            success: true,
            message: 'User count retrieved successfully',
            statusCode: httpStatus.OK,
            data: { totalUsers: count },
        });
    });

    public createUser = catchAsync(async (req: Request, res: Response) => {
        const user = await usersService.createUser(req.body);
        sendResponse(res, {
            success: true,
            message: 'User created successfully',
            statusCode: httpStatus.CREATED,
            data: user,
        });
    });

    public updateUser = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedUser = await usersService.updateUser(id, req.body);
        sendResponse(res, {
            success: true,
            message: 'User updated successfully',
            statusCode: httpStatus.OK,
            data: updatedUser,
        });
    });

    public UpdateUserRole = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { role } = req.body;
        const updatedUser = await usersService.UpdateUserRole(id, { role });
        if (!updatedUser) {
            return sendResponse(res, {
                success: false,
                message: 'User not found',
                statusCode: httpStatus.NOT_FOUND,
                data: null,
            });
        }
        sendResponse(res, {
            success: true,
            message: 'User role updated successfully',
            statusCode: httpStatus.OK,
            data: updatedUser,
        });
    });
}

export const userController = new UserController();
