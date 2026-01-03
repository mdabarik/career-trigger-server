/* eslint-disable @typescript-eslint/no-explicit-any */

import Post from './posts.model';

const getAllPosts = async () => {
    const posts = await Post.find();
    return posts;
};

export const PostServices = {
    getAllPosts,
};
