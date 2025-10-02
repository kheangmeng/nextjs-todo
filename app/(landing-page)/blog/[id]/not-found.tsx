import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-[calc(100vh-220px)] flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested blog post.</p>
      <Link
        href="/blog"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}