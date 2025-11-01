'use client'

import Link from 'next/link';
import useSWR from 'swr';
// import { Button } from '@/components/ui/button';
// import { TrashIcon } from 'lucide-react';
import { Session } from 'next-auth';
import JumpingDotsLoader from '@/components/jumping-dot-loader';
import { BlogResponse } from '@/types';

async function getBookmarkBlogs({ session }: { session: Session }) {
    let remote: BlogResponse[] = [];
    if (session?.user?.accessToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/bookmarks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
        });
        if (res.ok) {
          const { posts } = (await res.json()) || [];
          remote = posts || [];
          console.log('remote bookmark posts', remote);
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        console.error('fetch external blogs error', err);
      }
    }
    return remote
  }
export const BlogBookmarkCard = ({ session }: { session: Session }) => {
  const { data: blogData, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/bookmarks`, () => getBookmarkBlogs({session}))

  if (error) return <div>failed to load</div>
  if (isLoading) return <JumpingDotsLoader />

  return (
    <div className="space-y-6">
      {blogData?.map(post => (
        <BookmarkCard key={post.id} post={post} />
      ))}
    </div>
  );
}

const BookmarkCard = ({ post }: { post: BlogResponse }) => {
  return (
    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-500 dark:text-white rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer">
      <Link href={`/blog/${post.id}`} className='flex items-start space-x-4'>
        <img src={post.image?.replace('600x400', '150x100') || undefined} alt={post.title} className="w-24 h-16 object-cover rounded-md flex-shrink-0" />
        <div>
          {/* <span className="text-xs font-semibold text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">{post.tags[0]?.title}</span> */}
          <h4 className="text-md font-bold text-slate-800 dark:text-white mt-1 leading-tight">{post.title}</h4>
          <div className='w-[30vw] truncate'>{post.description}</div>
          <p className="text-xs text-slate-500 dark:text-slate-300">By {post.author?.username}</p>
        </div>
      </Link>
      {/* <Button variant="outline" size="icon-sm">
        <TrashIcon />
      </Button> */}
    </div>
  )
}
