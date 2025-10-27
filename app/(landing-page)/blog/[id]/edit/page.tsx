import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BlogForm } from "@/components/blog-landing/blog-form"
import { Card } from "@/components/ui/card"
import { notFound } from 'next/navigation';
import { BlogResponse } from '@/types';

async function getDetail(id: number): Promise<BlogResponse>{
  const session = await getServerSession(authOptions);
  let remotePosts: {post: any} | undefined = undefined;
  if (id && session?.user?.accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });
      if (res.ok) {
        remotePosts = (await res.json()) || undefined;
        console.log('remote posts', remotePosts?.post);
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external blogs error', err);
    }
  }
  return remotePosts?.post;
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const params = await props.params;
  const id = Number(params.id)

  if (!session) {
    return <p className="mt-22 text-center text-red-500 text-xl font-semibold">Access Denied. Please sign in.</p>;
  }

  const remotePost = await getDetail(id);
  if (!remotePost) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center space-y-3">
      <Card className="w-3/4 pt-6 px-6">
        <h2 className="text-center text-black dark:text-white text-2xl font-semibold">Update Blog</h2>

        <BlogForm data={remotePost} />
      </Card>
    </div>
  )
}
