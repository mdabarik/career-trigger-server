import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
    title: string;
    category: string;
    photoUrl: string;
    details: string;
    tags: string[];
    author: string;
    date: Date;
    status: 'declined' | 'published' | 'pending';
    like: number;
    dislike: number;
}

const postSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        photoUrl: { type: String, required: true },
        details: { type: String, required: true },
        tags: { type: [String], default: [], required: true },
        author: { type: String, required: true },
        date: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['declined', 'published', 'pending'],
            default: 'pending',
        },
        like: { type: Number, default: 0 },
        dislike: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Post = model<IPost>('Post', postSchema);

export default Post;
