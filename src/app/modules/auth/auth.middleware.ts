import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user || !roles.includes(user.role)) {
            return res
                .status(403)
                .json({ message: 'Forbidden: insufficient role' });
        }
        next();
    };
};
