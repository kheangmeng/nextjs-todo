import Link from 'next/link';
import { BlogResponse } from '@/types';

export const BlogCardAside = ({ post }: { post: BlogResponse }) => {
  return (
    <div>
      <div className="flex flex-col justify-between border-1 dark:border-0 shadow-md border-slate-200 dark:bg-muted/50 aspect-video rounded-xl py-2 px-3 text-slate-800 dark:text-white transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
        <div>
          <h2 className="text-center text-lg font-semibold">{post.title}</h2>
          <div className="text-sm mt-1 w-full">{post.description}</div>
        </div>
        <Link
          href={`/blog/${post.id}`}
          className="text-blue-600 dark:text-blue-300 text-sm font-semibold hover:text-blue-800 dark:hover:text-blue-100 transition-colors self-start mt-auto"
        >
          Read More &rarr;
        </Link>
      </div>
    </div>
  )
}
