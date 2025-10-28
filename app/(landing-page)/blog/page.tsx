import { blogPosts } from '@/components/blog-landing/data';
import BlogPostCard from '@/components/blog-landing/blog-card';
import { BlogCarousel } from '@/components/blog-landing/blog-carousel';
import { BlogCardAside } from '@/components/blog-landing/blog-card-aside';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Tag, BlogResponse } from '@/types';

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
      });
      if (res.ok) {
        const { tags } = (await res.json()) || [];
        remote = tags.tags || [];
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

  const [remotePosts, remoteTags] = await Promise.all([
    getBlogs({ tag }),
    getTags(),
  ])
  const postsToRender = remotePosts?.length ? remotePosts : blogPosts;

  return (
    <div className=" container mx-auto px-6 py-12 dark:bg-slate-900 dark:text-white">
      <div className="flex justify-center mb-6 h-90"><BlogCarousel /></div>
      <Card className='my-3'>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white text-center">Popular tags</h1>
        <div className='space-x-3 mx-3'>
          { remoteTags.map(tag => (
            <Link key={tag.id} href={`/blog?tag=${tag.title}`}>#{tag.title}</Link>
          ))}
        </div>
      </Card>
      <div className="flex flex-col md:flex-row gap-6">
        {/* <h1 className="text-4xl font-extrabold text-center text-slate-800 dark:text-white mb-12">Latest Articles</h1> */}
        <div className="w-full md:w-4/5 lg:w-4/5">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remotePosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <aside className="w-full md:w-1/5 lg:w-1/5">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 text-center">Top Rate</h2>
          <div className="space-y-5">
            <BlogCardAside />
            <BlogCardAside />
            <BlogCardAside />
          </div>
          <hr className="my-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 text-center">Popular Posts</h2>
          <div className="space-y-5">
            <BlogCardAside />
            <BlogCardAside />
            <BlogCardAside />
          </div>
        </aside>
      </div>
    </div>
  )
}
