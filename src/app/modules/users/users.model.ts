import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    photoUrl: string;
    role: 'admin' | 'editor' | 'user';
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        photoUrl: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'editor', 'user'],
            default: 'user',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>('User', userSchema);

export default User;
