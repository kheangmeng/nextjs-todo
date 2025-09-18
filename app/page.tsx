"use server"

import { Suspense } from "react";
import { TodoTable } from "@/components/TodoTable";
import { Loader2Icon } from "lucide-react";
import { TodoResponse } from "@/types";
import { formatDate } from "@/lib/utils";

export default async function Home({ searchParams }: { searchParams: { query: string } }) {
  const { query } = await searchParams
  let todos: TodoResponse[] = []
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/todo?query=${query}`)
    todos = (await data.json()).todos || []
    if(todos.length > 0) {
      todos = todos.map((todo: TodoResponse) => ({
        ...todo,
        created_at: formatDate(todo.created_at),
      }))
    }
  } catch (error) {
    
  }
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[15px] row-start-2 items-center sm:items-start">
        <Suspense fallback={<Loader2Icon className="mr-2 h-8 w-8 animate-spin" />}>
          <TodoTable todos={todos} />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          @Copyright Todo
      </footer>
    </div>
  );
}
