import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
    user_id: Types.ObjectId;
    post_id: Types.ObjectId;
    loggedIn: boolean;
    details: string;
}

const commentSchema = new Schema<IComment>(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        loggedIn: { type: Boolean, default: false },
        details: { type: String, required: true },
    },
    { timestamps: true }
);

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
