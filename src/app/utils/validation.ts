import { Types } from 'mongoose';

export const isValidObjectId = (id: string, fieldName: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${fieldName}`);
    }
};
