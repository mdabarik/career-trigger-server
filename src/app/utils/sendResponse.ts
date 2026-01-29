import { Response } from 'express';
import { TResponse } from '../types/response.type';

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        statusCode: data?.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    });
};

export default sendResponse;
