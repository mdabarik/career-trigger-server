/* eslint-disable @typescript-eslint/no-explicit-any */

import Post from './posts.model';

const getPosts = async (params: any) => {
    const { status, author, search, sortById, limit, authorId } = params;
    console.log('services author id:', authorId);

    const query: any = {};

    if (authorId) query.authorId = authorId;
    if (status) query.status = status;
    if (author) query.author = author;
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
        ];
    }
    let postsQuery = Post.find(query);
    if (sortById) {
        postsQuery = postsQuery.sort({ _id: sortById === 'asc' ? 1 : -1 });
    }

    if (limit) {
        postsQuery = postsQuery.limit(Number(limit));
    }

    const posts = await postsQuery.exec();

    return posts;
};

export const PostServices = {
    getPosts,
};
