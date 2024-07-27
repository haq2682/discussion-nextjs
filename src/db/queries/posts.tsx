import type {Post, Topic, User} from '@prisma/client';
import { db } from '@/db';

export type PostWithData = (
    Post & {
        topic: Topic,
        user: User,
        _count: {comments: number}
    }
)

export async function fetchPostsByTopic(slug: string): Promise<PostWithData[]> {
    const posts = await db.post.findMany({
        where: {topic: {slug}},
        include: {
            topic: true,
            user: true,
            _count: {select: {comments: true}}
        }
    });
    return posts;
}

export async function fetchTopPosts(): Promise<PostWithData[]> {
    const posts = await db.post.findMany({
        include: {
            topic: true,
            user: true,
            _count: {select: {comments: true}}
        },
        orderBy: [
            {
                comments: {
                    _count: "desc"
                }
            }
        ],
        take: 5
    });
    return posts;
}

export async function fetchPostsBySearch(term: string): Promise<PostWithData[]> {
    const posts = await db.post.findMany({
        include: {
            topic: true,
            user: true,
            _count: {select: {comments: true}}
        },
        where: {
            OR: [
                {
                    title: { contains: term }
                },
                {
                    content: { contains: term }
                }
            ]
        } 
    });
    return posts;
}