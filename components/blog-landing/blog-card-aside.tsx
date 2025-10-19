import Link from 'next/link';

export const BlogCardAside = () => {
  return (
    <div className="flex flex-col justify-between border-1 dark:border-0 shadow-md border-slate-200 dark:bg-muted/50 aspect-video rounded-xl py-2 px-3 text-slate-800 dark:text-white transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div>
        <p className="text-center font-semibold">New Version Next.js</p>
        <div className="text-sm mt-1">React continues to dominate the front-end landscape...</div>
      </div>
      <Link
        href={`/blog/${'post.id'}`}
        className="text-blue-600 dark:text-blue-300 text-sm font-semibold hover:text-blue-800 dark:hover:text-blue-100 transition-colors self-start mt-auto"
      >
        Read More &rarr;
      </Link>
    </div>
  )
}
