import { Schema, model, Document, Types } from 'mongoose';

export interface IPostDocument extends Document {
    title: string;
    categoryId: Types.ObjectId;
    photoUrl: string;
    description: string;
    authorId: Types.ObjectId;
    status: 'declined' | 'published' | 'pending';
}

const postSchema = new Schema<IPostDocument>(
    {
        title: { type: String, required: true },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        photoUrl: { type: String, required: true },
        description: { type: String, required: true },
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
            type: String,
            enum: ['declined', 'published', 'pending'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    },
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

const Post = model<IPostDocument>('Post', postSchema);

export default Post;
