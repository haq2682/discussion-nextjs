'use client';
import Header from "@/components/ui/Header";
import { useSession } from "next-auth/react";
import PostCreateForm from "@/components/posts/create-posts";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopic } from "@/db/queries/posts";

export default function TopicShowPage({params}: {params: {slug: string}}) {
    const session = useSession();
    return (
        <>
            <Header session={session}/>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-3">
                    <h1>{params?.slug}</h1>
                    <PostList fetchData={() => fetchPostsByTopic(params?.slug)}/>
                </div>
                <PostCreateForm slug={params?.slug} />
            </div>
        </>
    )
}