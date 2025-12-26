import BlogPostCard from '@/components/blog-landing/blog-card';
import { BlogCarousel } from '@/components/blog-landing/blog-carousel';
import { BlogCardAside } from '@/components/blog-landing/blog-card-aside';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { BlogResponse, Tag } from '@/types';
import { Suspense, use } from 'react';

async function getBlogs({ tag }: { tag?: string }) {
  // const session = await getServerSession(authOptions);
  let remote: BlogResponse[] = [];
  // if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts?tag=${tag}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });
      if (res.ok) {
        const { posts } = (await res.json()) || [];
        remote = posts || [];
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external blogs error', err);
    }
  // }
  return remote
}

async function getTopRatedBlogs() {
  // const session = await getServerSession(authOptions);
  let remote: BlogResponse[] = [];
  // if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/top-rated?order=-id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });
      if (res.ok) {
        const { posts } = (await res.json()) || [];
        remote = posts || [];
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external blogs error', err);
    }
  // }
  return remote
}

async function getTags() {
  // const session = await getServerSession(authOptions);
  let remote: Tag[] = [];
  // if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${session.user.accessToken}`,
        },
        // next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        remote = Array.isArray(data.tags) ? data.tags : (data.tags?.tags || []);
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external tags error', err);
    }
  // }

  return remote
}

export default async function Page({ searchParams }: { searchParams: { tag: string } }) {
  const { tag } = await searchParams

  const [remotePosts, topRatedPosts] = await Promise.all([
    getBlogs({ tag }),
    getTopRatedBlogs(),
  ])
  const remoteTags = getTags()

  return (
    <div className=" container mx-auto px-6 py-12 dark:bg-slate-900 dark:text-white">
      <div className="flex justify-center mb-6 h-90"><BlogCarousel posts={remotePosts} /></div>
      <Card className='my-3'>
        <TagSection tagPromise={remoteTags} />
      </Card>
      <div className="flex flex-col md:flex-row gap-6">
        {/* <h1 className="text-4xl font-extrabold text-center text-slate-800 dark:text-white mb-12">Latest Articles</h1> */}
        <div className="w-full md:w-4/5 lg:w-4/5">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remotePosts.map(post => (
              <BlogPostCard key={`post-${post.id}`} post={post} />
            ))}
          </div>
        </div>
        <aside className="w-full md:w-1/5 lg:w-1/5">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 text-center">Popular Posts</h2>
          <div className="space-y-5">
            {topRatedPosts.map(post => (
              <BlogCardAside key={`top-rated-post-${post.id}`} post={post} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

const TagSection = ({tagPromise}: {tagPromise: Promise<Tag[]>}) => {
  const remoteTags = use(tagPromise);

  return (
    <Suspense fallback={<div>Loading tags...</div>}>
      <div className='space-x-6 mx-6'>
        { remoteTags.map(tag => (
          <Link className='hover:text-blue-300' key={`tag-${tag.id}`} href={`/blog?tag=${tag.title}`}>#{tag.title}</Link>
        ))}
      </div>
    </Suspense>
  )
}
