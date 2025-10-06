'use client'

import React, { useState } from 'react';
import { blogPosts, BlogPost } from './data';
import BlogDetail from './blog-detail';
import BlogPostCard from './blog-card';
import CommandPalette from "@/components/command-palette";

const Header = ({ onGoHome }: { onGoHome: () => void }) => (
  <header className="bg-white shadow-md sticky top-0 z-10">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div>
        <div
          className="text-2xl font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={onGoHome}
        >
          DevInsights Blog
        </div>
        <div className="mt-8 text-gray-500 bg-gray-800 p-4 rounded-xl">
          <p className="text-sm">
            Press
            <kbd className="font-mono bg-gray-700 px-2 py-1 rounded-md text-gray-300 mx-1 shadow-md">
              ⌘<span className="hidden md:inline">/Win</span>
            </kbd>
            +
            <kbd className="font-mono bg-gray-700 px-2 py-1 rounded-md text-gray-300 mx-1 shadow-md">
              K
            </kbd>
            to toggle the modal.
          </p>
        </div>
      </div>
      <ul className="flex space-x-6">
        <li><a href="#" onClick={(e) => { e.preventDefault(); onGoHome(); }} className="text-slate-600 hover:text-blue-600 transition-colors">Home</a></li>
        <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">About</a></li>
        <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a></li>
      </ul>
    </nav>
    <CommandPalette />
  </header>
);

const BlogHome = ({ posts, onSelectPost }: { posts: BlogPost[], onSelectPost: (post: BlogPost) => void}) => (
  <main className="container mx-auto px-6 py-12">
    <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-12">Latest Articles</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} onSelectPost={onSelectPost} />
      ))}
    </div>
  </main>
);

const Footer = () => (
  <footer className="bg-slate-800 text-white mt-12 py-8">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; {new Date().getFullYear()} DevInsights Blog. All Rights Reserved.</p>
      <p className="text-sm text-slate-400 mt-2">Designed with React & Tailwind CSS</p>
    </div>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'detail'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('detail');
  };

  const handleGoHome = () => {
    setSelectedPost(null);
    setCurrentPage('home');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Header onGoHome={handleGoHome} />
      {currentPage === 'home' && <BlogHome posts={blogPosts} onSelectPost={handleSelectPost} />}
      {currentPage === 'detail' && selectedPost && (
        <BlogDetail
            post={selectedPost}
            onGoHome={handleGoHome}
            onSelectPost={handleSelectPost}
        />
        )}
      <Footer />
    </div>
  );
}
