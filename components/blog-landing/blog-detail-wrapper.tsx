'use client'

import React from 'react';
import { RelatedPostCard } from '@/components/blog-landing/related-post-card';
import { BlogPost } from '@/components/blog-landing/data';
import Link from 'next/link';

interface BlogDetailWrapperProps {
  relatedPosts: BlogPost[];
  children: React.ReactNode;
}
export default function BlogDetailWrapper ({ relatedPosts, children }: BlogDetailWrapperProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-lg p-6 md:p-10 mb-8">
          <Link
            href={'/blog'}
            className="mb-8 text-blue-600 dark:text-blue-300 font-semibold hover:text-blue-800 dark:hover:text-blue-100 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
              Back to All Articles
          </Link>
          {children}
        </div>

        {relatedPosts.length > 0 && (
          <div className="bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
