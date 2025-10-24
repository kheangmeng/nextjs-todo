import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BlogForm } from "@/components/blog-landing/blog-form"
import { Card } from "@/components/ui/card"

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="mt-22 text-center text-red-500 text-xl font-semibold">Access Denied. Please sign in.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center space-y-3">
      <Card className="w-1/2 pt-6 px-6">
        <h2 className="text-center text-black dark:text-white text-2xl font-semibold">Create Blog</h2>
        <BlogForm />
      </Card>
    </div>
  )
}
