import { Model } from 'mongoose';
import {
    IGetAllPostsQuery,
    IPostDTO,
    IPostReaderService,
} from './posts.interface';
import Post, { IPostDocument } from './posts.model';

class PostService implements IPostReaderService {
    constructor(private postModel: Model<IPostDocument>) {}

    async GetAllPosts(query: IGetAllPostsQuery): Promise<IPostDTO[]> {
        const { limit, searchText, status } = query;
        const filter: Record<string, unknown> = {};
        if (status) {
            filter.status = status;
        }
        if (searchText) {
            filter.title = { $regex: searchText, $options: 'i' };
        }
        let postsQuery = this.postModel.find(filter).lean<IPostDTO[]>();
        if (limit) {
            postsQuery = postsQuery.limit(limit);
        }
        return postsQuery;
    }

    async GetPostById(id: string): Promise<IPostDTO | null> {
        return this.postModel.findById(id).lean<IPostDTO | null>();
    }
}

export const postService = new PostService(Post);
