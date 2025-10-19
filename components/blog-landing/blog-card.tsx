'use client'

import { BlogPost } from './data';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
  onSelectPost?: (post: BlogPost) => void;
}

export default function BlogPostCard({ post, onSelectPost }: BlogPostCardProps) {
  return (
    <div className="bg-white dark:dark:bg-muted/50 dark:text-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow dark:text-white">
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 rounded-full px-3 py-1 self-start mb-3">{post.category}</span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{post.title}</h2>
          <p className="text-slate-500  dark:text-white text-sm mb-4">
              By {post.author} on {post.date}
          </p>
          <p className="text-slate-600 dark:text-white mb-4 flex-grow">{post.excerpt}</p>
          {
            onSelectPost ? (
              <button
                onClick={() => onSelectPost(post)}
                className="text-blue-600 dark:text-blue-300 font-semibold hover:text-blue-800 dark:hover:text-blue-100 transition-colors self-start mt-auto"
              >
                Read More &rarr;
              </button>) : (
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-600 dark:text-blue-300 font-semibold hover:text-blue-800 dark:hover:text-blue-100 transition-colors self-start mt-auto"
              >
                Read More &rarr;
              </Link>
            )
          }
      </div>
    </div>
  )
}
