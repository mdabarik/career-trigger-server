import Comment from './comment.model';
import { Types } from 'mongoose';

const createComment = async (payload: any) => {
    const comment = await Comment.create(payload);
    return comment;
};

const updateComment = async (id: string, payload: Partial<any>) => {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid comment id');
    const updated = await Comment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updated;
};

const getCommentsByPostId = async (postId: string) => {
    if (!Types.ObjectId.isValid(postId)) throw new Error('Invalid post id');
    return await Comment.find({ post_id: postId }).sort({ createdAt: -1 });
};

const getCommentsByUserId = async (userId: string) => {
    if (!Types.ObjectId.isValid(userId)) throw new Error('Invalid user id');
    return await Comment.find({ user_id: userId }).sort({ createdAt: -1 });
};

const getAllComments = async (params: any) => {
    let { sort = 'new', page = 1, limit = 10, status, post_id } = params;

    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const filter: any = {};
    if (status !== undefined) filter.loggedIn = status;
    if (post_id && Types.ObjectId.isValid(post_id)) filter.post_id = post_id;

    const sortOrder = sort === 'old' ? 1 : -1;
    const skip = (page - 1) * limit;

    const comments = await Comment.find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit);

    const totalComments = await Comment.countDocuments(filter);
    const totalPages = Math.ceil(totalComments / limit) || 1;

    if (page > totalPages) page = 1;

    return {
        comments,
        recordCount: totalComments,
        page,
        limit,
        totalPages,
    };
};

export const CommentServices = {
    createComment,
    updateComment,
    getCommentsByPostId,
    getCommentsByUserId,
    getAllComments,
};
