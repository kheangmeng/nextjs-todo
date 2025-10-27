'use client'

import { BlogResponse } from '@/types';
import Link from 'next/link';
import { formatDate2 } from '@/lib/utils';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface BlogPostCardProps {
  post: BlogResponse;
  onSelectPost?: (post: BlogResponse) => void;
}

export default function BlogPostCard({ post, onSelectPost }: BlogPostCardProps) {
  return (
    <div className="relative bg-white dark:dark:bg-muted/50 dark:text-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      <img src={post?.image || undefined} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow dark:text-white">
          <div className='flex gap-2'>
            { post.tags.map((tag, index) => (
                <span key={index} className="cursor-pointer text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full px-3 py-1 self-start mb-3">{tag.title}</span>
              ))
            }
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{post.title}</h2>
          <p className="text-slate-500  dark:text-white text-sm">
            By {post.user?.username} on {formatDate2(post.createdAt)}
          </p>
          <div className='flex items-center gap-2'>
            <Rating value={post.avgRate} className='my-3' readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} size={12} className="text-yellow-500" />
              ))}
            </Rating>
            <span>( {post.rateCount} )</span>
          </div>
          <p className="text-slate-600 dark:text-white mb-4 flex-grow">{post.description}</p>
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
