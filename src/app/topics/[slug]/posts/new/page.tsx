'use client';

import PostCreateForm from "@/components/posts/create-posts";

interface CreatePostPageProps {
    slug: string
}

export default function CreatePostPage(props: CreatePostPageProps) {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-3">
                    <h1 className="text-xl m-2">Top Posts</h1>
                </div>
                <div className="shadow py-3 px-3">
                    <PostCreateForm slug={props.slug}/>
                </div>
            </div>
        </>
    )
}