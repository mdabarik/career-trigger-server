/* eslint-disable @typescript-eslint/no-explicit-any */
import Post from './posts.model';

const getPosts = async (params: any) => {
    const { status, search, sortById, authorId, page, itemPerPage } = params;

    const query: any = {};

    if (authorId) query.authorId = authorId;
    if (status) query.status = status;
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
        ];
    }

    let postsQuery = Post.find(query).populate('author').populate('category');

    if (sortById) {
        postsQuery = postsQuery.sort({ _id: sortById === 'asc' ? 1 : -1 });
    }

    /* pagination logic start */
    const totalItems = await Post.countDocuments(query);
    const perPage = Number(itemPerPage) || 10;
    let pageNumber = Number(page) || 1;
    if (pageNumber < 1 || isNaN(pageNumber)) {
        pageNumber = 1;
    }
    const totalPages = Math.ceil(totalItems / perPage);
    if (pageNumber > totalPages) {
        pageNumber = totalPages;
    }
    const skip = (pageNumber - 1) * perPage;
    /* pagination logic end */

    postsQuery = postsQuery.skip(skip).limit(perPage);
    const posts = await postsQuery.exec();

    // console.log(posts);

    return {
        posts: posts,
        recordCount: totalItems,
    };
};

const createPost = async (payload: any) => {
    const post = await Post.create(payload);
    return post;
};

export const PostServices = {
    getPosts,
    createPost,
};
