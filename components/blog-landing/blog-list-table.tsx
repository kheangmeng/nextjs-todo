"use client"

import React from "react";
import useSWR from 'swr'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import JumpingDotsLoader from '@/components/jumping-dot-loader';
import { formatDate } from '@/lib/utils';
import type { BlogResponse } from "@/types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { type Session } from "next-auth";

async function getList(accessToken: string): Promise<BlogResponse[]> {
  let remotePosts: { posts: any[] } | undefined = undefined;
  if (accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/my-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    remotePosts = (await res.json()) || [];
    console.log('remote posts', remotePosts?.posts);
  }
  return remotePosts?.posts || []
}
export default function BlogListTable({session}: {session: Session}) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const query = searchParams.get('query');
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);
  const { data: blogData, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/my-posts`, () => getList(session?.user?.accessToken || ''))

  const noFilterFound = () => {
    if (blogData?.length === 0 && query) {
      return <TableCaption className="text-center text-gray-500">
        No result. Create a new one instead!
      </TableCaption>
    }
  }
  const handleDeleteBlog = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blog/${id}`, {
        method: 'DELETE',
      })
      toast.success("Todo deleted successfully!");
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Failed to delete blog!");
      }
    } finally {
      setLoading(false);
    }
  }
  function DeleteBlogDialog({ id }: { id: number }) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive" disabled={loading}>
            {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : 'Delete'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this post from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteBlog(id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (error) return <div>failed to load</div>
  if (isLoading) return <JumpingDotsLoader />

  return (
    <Table className="w-full">
      {noFilterFound()}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Is Publish</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-collapse">
        {isPending ?
            <TableRow>
              <TableCell colSpan={5} className="text-center"><Loader2Icon className="mx-auto h-6 w-6 animate-spin" /></TableCell>
            </TableRow>
          : blogData?.map((blog: BlogResponse) => (
            <TableRow
              key={blog.id}
              className="group strikeout"
            >
              <TableCell className="font-medium">
                {blog.id}
              </TableCell>
              <TableCell className="font-medium">
                {blog.title}
              </TableCell>
              <TableCell className="font-medium">
                {blog.isPublished ? 'Published' : 'Draft'}
              </TableCell>
              <TableCell className="font-medium">
                {blog.author?.username}
              </TableCell>
              <TableCell className="font-medium">
                <div className="truncate w-[350px]">{blog.description}</div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatDate(blog.createdAt)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatDate(blog.updatedAt)}
              </TableCell>
              <TableCell className="flex gap-2 invisible group-hover:visible">
                <Button size="sm" variant="default" onClick={() => console.log('edit')} asChild>
                  <Link href={`/blog/${blog.id}/edit`}>Edit</Link>
                </Button>
                <DeleteBlogDialog id={blog.id} />
              </TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
