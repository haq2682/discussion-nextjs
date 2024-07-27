'use client';
import Header from '@/components/ui/Header';
import { useSession } from 'next-auth/react';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { Divider } from '@chakra-ui/react';
import PostList from '@/components/posts/post-list';
import { fetchTopPosts } from '@/db/queries/posts';
import { Suspense } from 'react';
export default function Home() {
  const session = useSession();
  return (
    <>
      <Header session={session}/> 
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          <h1 className="text-xl m-2">Top Posts</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <PostList fetchData={fetchTopPosts} />
          </Suspense>
        </div>
        <div className="shadow py-3 px-3">
          <TopicCreateForm />
          <Divider className="my-3"/>
          <TopicList/>
        </div>
      </div>
    </>
  );
}
