export interface Post {
    title: string;
    categoryId: string;
    author: string;
    photoUrl: string;
    description: string;
    authorId: string;
}

export type PostStatus = 'declined' | 'published' | 'pending';
