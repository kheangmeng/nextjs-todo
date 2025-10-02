import { blogPosts } from '@/components/blog-landing/data';
import BlogPostCard from '@/components/blog-landing/blog-card';

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-12">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
