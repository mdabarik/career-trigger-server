import Post from '../posts/posts.model';
import Reaction from './reaction.model';

const reactToPost = async (
    postId: string,
    userId: string,
    action: 'like' | 'dislike'
) => {
    const existingReaction = await Reaction.findOne({ postId, userId });

    if (!existingReaction) {
        await Reaction.create({ postId, userId, action });
        await Post.findByIdAndUpdate(postId, {
            $inc: { [action + 'Count']: 1 },
        });
    } else if (existingReaction.action === action) {
        await Reaction.deleteOne({ _id: existingReaction._id });
        await Post.findByIdAndUpdate(postId, {
            $inc: { [action + 'Count']: -1 },
        });
    } else {
        await Reaction.updateOne({ _id: existingReaction._id }, { action });
        await Post.findByIdAndUpdate(postId, {
            $inc: {
                [existingReaction.action + 'Count']: -1,
                [action + 'Count']: 1,
            },
        });
    }

    return await Post.findById(postId);
};

export const ReactionServices = { reactToPost };
