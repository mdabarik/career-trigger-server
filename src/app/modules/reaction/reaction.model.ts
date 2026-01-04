import { Schema, model, Document, Types } from 'mongoose';

interface IReaction extends Document {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    action: 'like' | 'dislike';
}

const reactionSchema = new Schema<IReaction>(
    {
        postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        action: { type: String, enum: ['like', 'dislike'], required: true },
    },
    { timestamps: true }
);

reactionSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Reaction = model<IReaction>('Reaction', reactionSchema);
export default Reaction;
