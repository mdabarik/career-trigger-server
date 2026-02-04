import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';

    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation failed';
    } else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message || message;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        err,
        stack: config.dev_env === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
