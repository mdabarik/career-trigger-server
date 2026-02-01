import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    photoUrl: string;
    role: 'admin' | 'editor' | 'user';
    password: string;
    provider: string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        photoUrl: {
            type: String,
            required: false,
            default:
                'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        },
        role: {
            type: String,
            enum: ['admin', 'editor', 'user'],
            default: 'user',
            required: true,
        },
        password: { type: String, required: false },
        provider: {
            type: String,
            enum: ['credentials', 'google'],
            default: 'credentials',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// userSchema.pre('save', async function () {
//     if (!this.isModified('password')) return;
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
// });

const User = model<IUser>('User', userSchema);

export default User;
