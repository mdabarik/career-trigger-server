import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().trim().min(1).required(),
});

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { error } = registerSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { error } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};

export const validateRefreshToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { error } = refreshTokenSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};
