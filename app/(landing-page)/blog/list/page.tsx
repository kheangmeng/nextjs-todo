"use client"

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import BlogListTable from '@/components/blog-landing/blog-list-table'

export default function Page() {
  const [isPending, startTransition] = React.useTransition();
  const { data: session, status } = useSession();

  const searchParams = useSearchParams()
  const query = searchParams.get('query');
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

  return (<Card className="p-6 mt-12 mx-6">
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="mb-3 text-2xl font-semibold">My Blogs</h1>
        <Button asChild><Link href="/blog/create">Create Blog</Link></Button>
      </div>
      <Input
        className="w-full md:w-1/2 mb-2"
        type="text"
        placeholder="Filter blogs..."
        defaultValue={filter}
        onChange={(e) => handleSearchTodo(e.target.value)}
      />

      { session && <BlogListTable session={session} />}
    </div>
  </Card>)
}
