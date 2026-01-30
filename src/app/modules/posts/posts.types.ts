export interface Post {
    title: string;
    categoryId: string;
    author: string;
    photoUrl: string;
    description: string;
    authorId: string;
}

export type PostStatus = 'declined' | 'published' | 'pending';

export type TPopulatedPost = {
    _id: string;
    title: string;
    photoUrl: string;
    description: string;
    status: 'declined' | 'published' | 'pending';
    authorId: string;
    author: { _id: string; name: string };
    category: { _id: string; name: string };
};
