import React from 'react';
import BlogDetailWrapper from '@/components/blog-landing/blog-detail-wrapper';
import { blogPosts } from '@/components/blog-landing/data';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


async function getDetail(id: number) {
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

export default async function BlogDetail (props: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    const params = await props.params;
    const id = Number(params.id)
    const post = blogPosts.find(p => p.id === id);
    if (!post) {
      notFound();
    }

    if (!session) {
      return <p className="mt-22 text-center text-red-500 text-xl font-semibold">Access Denied. Please sign in.</p>;
    }

    const remotePosts = await getDetail(id);
    const postToRender = remotePosts ? remotePosts : blogPosts;

  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);

  return (
    <BlogDetailWrapper relatedPosts={relatedPosts}>
      <span className="text-md font-semibold text-blue-600 bg-blue-100 rounded-full px-4 py-1 self-start mb-4 inline-block">{post.category}</span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 leading-tight">{post.title}</h1>
      <p className="text-slate-500 dark:text-slate-300 text-md mb-6">
        Posted by <strong>{post.author}</strong> on {post.date}
      </p>
      <img src={post.imageUrl.replace('600x400', '800x400')} alt={post.title} className="w-full h-auto rounded-lg mb-8 shadow-md" />
      <div
        className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
      </div>
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="cursor-pointer text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </BlogDetailWrapper>
  );
};
