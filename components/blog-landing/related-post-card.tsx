import Link from 'next/link';
import { BlogPost } from '@/components/blog-landing/data';

export const RelatedPostCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.id}`} className="bg-slate-50 dark:bg-slate-500 dark:text-white rounded-lg p-4 flex items-start space-x-4 hover:bg-slate-100 transition-colors cursor-pointer">
    <img src={post.imageUrl.replace('600x400', '150x100')} alt={post.title} className="w-24 h-16 object-cover rounded-md flex-shrink-0" />
    <div>
      <span className="text-xs font-semibold text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">{post.category}</span>
      <h4 className="text-md font-bold text-slate-800 dark:text-white mt-1 leading-tight">{post.title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-300">By {post.author}</p>
    </div>
  </Link>
);
