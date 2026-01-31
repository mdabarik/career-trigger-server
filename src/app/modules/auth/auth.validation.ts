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

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};
