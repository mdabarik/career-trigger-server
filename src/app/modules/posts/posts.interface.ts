export interface IPostDTO {
    title: string;
    categoryId: string;
    photoUrl: string;
    description: string;
    authorId: string;
    status: 'declined' | 'published' | 'pending';
}

export interface IPostReader {
    GetAllPosts(): Promise<IPostDTO[]>;
    GetPostById(id: string): Promise<IPostDTO | null>;
}
