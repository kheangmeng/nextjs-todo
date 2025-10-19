"use client"

import React from "react";
import useSWR from 'swr'
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import type { BlogResponse } from "@/types"

async function getList(accessToken: string) {
  let remotePosts: { posts: any[] } | undefined = undefined;
  if (accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts`, {
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
  return remotePosts?.posts
}
export default function Page({ blogs = [] }: { blogs: BlogResponse[] }) {
  const { data: session, status } = useSession();
  const { data: blogData, error, isLoading } = useSWR('/api/user', () => getList(session?.user?.accessToken || ''))

  const searchParams = useSearchParams()
  const query = searchParams.get('query');

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState<string>(query || '');
  const router = useRouter();

  let timeout: NodeJS.Timeout;
  const handleSearchTodo = async (query: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      startTransition(() => {
        router.push(`/blog/list?query=${query}`)
      })
    }, 500);
  }

  const noFilterFound = () => {
    if (blogs.length === 0 && query) {
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
              This action cannot be undone. This will permanently delete this todo from servers.
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
  if (isLoading) return <div>loading...</div>

  return (<div className="p-6">
    <div className="w-[450] md:w-[1000]">
      {/* {blogData?.postsResult?.length} */}
      <Input
        className="w-full md:w-1/2 mb-2"
        type="text"
        placeholder="Filter blogs..."
        defaultValue={filter}
        onChange={(e) => handleSearchTodo(e.target.value)}
      />

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
            : blogs.map((blog: BlogResponse) => (
              <TableRow
                key={blog.id}
                className="group strikeout"
              >
                <TableCell className="font-medium">
                  {blog.id}
                </TableCell>
                <TableCell className="font-medium">
                  {blog.isPublished ? 'Published' : 'Draft'}
                </TableCell>
                <TableCell className="font-medium">
                  {blog.userId}
                </TableCell>
                <TableCell className="font-medium">
                  {blog.description}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {blog.createdAt}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {blog.updatedAt}
                </TableCell>
                <TableCell className="flex gap-2 invisible group-hover:visible">
                  <Button size="sm" variant="default" onClick={() => console.log('edit')}>Edit</Button>
                  <DeleteBlogDialog id={blog.id} />
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>)
}
