import { Schema, model, Document, Types } from 'mongoose';

interface IPost extends Document {
    title: string;
    categoryId: Types.ObjectId;
    photoUrl: string;
    details: string;
    tags: string[];
    authorId: Types.ObjectId;
    date: Date;
    status: 'declined' | 'published' | 'pending';
    likeCount: number;
    dislikeCount: number;
}

const postSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        photoUrl: { type: String, required: true },
        details: { type: String, required: true },
        tags: { type: [String], default: [], required: true },

        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

        date: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['declined', 'published', 'pending'],
            default: 'pending',
        },
        likeCount: { type: Number, default: 0 },
        dislikeCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

postSchema.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true,
});

postSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

const Post = model<IPost>('Post', postSchema);

export default Post;
