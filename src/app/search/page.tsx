'use client';
import Header from "@/components/ui/Header";
import { fetchPostsBySearch } from "@/db/queries/posts";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import PostList from "@/components/posts/post-list";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const session = useSession();
    return (
        <>
            <Header session={session} />
            <PostList fetchData={() => fetchPostsBySearch(searchParams.get('term') || "")}/>
        </>
    )
}