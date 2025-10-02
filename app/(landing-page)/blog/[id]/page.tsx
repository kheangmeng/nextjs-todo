import React from 'react';
import { blogPosts, BlogPost } from '@/components/blog-landing/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BlogDetail (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = Number(params.id)
    const post = blogPosts.find(p => p.id === id);
    if (!post) {
      notFound();
    }

  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 mb-8">
          <Link 
            href={'/blog'}
            className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
              Back to All Articles
          </Link>
          <span className="text-md font-semibold text-blue-600 bg-blue-100 rounded-full px-4 py-1 self-start mb-4 inline-block">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">{post.title}</h1>
          <p className="text-slate-500 text-md mb-6">
            Posted by <strong>{post.author}</strong> on {post.date}
          </p>
          <img src={post.imageUrl.replace('600x400', '800x400')} alt={post.title} className="w-full h-auto rounded-lg mb-8 shadow-md" />
          <div 
            className="prose prose-lg max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          >
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="cursor-pointer text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const RelatedPostCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.id}`} className="bg-slate-50 rounded-lg p-4 flex items-start space-x-4 hover:bg-slate-100 transition-colors cursor-pointer">
    <img src={post.imageUrl.replace('600x400', '150x100')} alt={post.title} className="w-24 h-16 object-cover rounded-md flex-shrink-0" />
    <div>
      <span className="text-xs font-semibold text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">{post.category}</span>
      <h4 className="text-md font-bold text-slate-800 mt-1 leading-tight">{post.title}</h4>
      <p className="text-xs text-slate-500">By {post.author}</p>
    </div>
  </Link>
);