import { Response } from 'express';

type TResponse<T> = {
    success: boolean;
    message?: string;
    statusCode: number;
    data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    console.log('send response:', data);
    res.status(data?.statusCode).json({
        statusCode: data?.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    });
};

export default sendResponse;
