'use client'

import { BlogPost } from './data';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
  onSelectPost?: (post: BlogPost) => void;
}

export default function BlogPostCard({ post, onSelectPost }: BlogPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 rounded-full px-3 py-1 self-start mb-3">{post.category}</span>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{post.title}</h2>
          <p className="text-slate-500 text-sm mb-4">
              By {post.author} on {post.date}
          </p>
          <p className="text-slate-600 mb-4 flex-grow">{post.excerpt}</p>
          {
            onSelectPost ? (
              <button 
                onClick={() => onSelectPost(post)}
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors self-start mt-auto"
              >
                Read More &rarr;
              </button>) : (
              <Link 
                href={`/blog/${post.id}`}
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors self-start mt-auto"
              >
                Read More &rarr;
              </Link>
            )
          }
      </div>
    </div>
  )
}