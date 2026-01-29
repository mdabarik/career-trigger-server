import { Model } from 'mongoose';
import { IPostDTO, IPostReaderService } from './posts.interface';
import Post, { IPostDocument } from './posts.model';

class PostService implements IPostReaderService {
    constructor(private postModel: Model<IPostDocument>) {}

    async GetAllPosts(): Promise<IPostDTO[]> {
        return this.postModel.find().lean<IPostDTO[]>();
    }

    async GetPostById(id: string): Promise<IPostDTO | null> {
        return this.postModel.findById(id).lean<IPostDTO | null>();
    }
}

export const postService = new PostService(Post);
