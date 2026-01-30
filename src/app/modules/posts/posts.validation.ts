import { PostStatus } from './posts.types';

export function isValidStatus(value: unknown): value is PostStatus {
    return (
        typeof value === 'string' &&
        ['declined', 'published', 'pending'].includes(value)
    );
}
