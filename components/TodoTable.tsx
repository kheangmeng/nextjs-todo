"use client"

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Button } from "./ui/button"
import type { TodoResponse } from "@/types"
import { formatDate } from "@/lib/utils"
import { TodoForm } from "@/components/TodoForm";
import { Input } from "./ui/input";

export function TodoTable({ todos = [] }: { todos: TodoResponse[] }) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query');

  const [item, setItem] = React.useState<TodoResponse>();
  const [loading, setLoading] = React.useState<'deleting' | 'updating' | ''>('');
  const [filter, setFilter] = React.useState<string>(query || '');
  const router = useRouter();

  const handleDeleteTodo = async (id: string) => {
    setLoading('deleting');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/todo/${id}`, {
        method: 'DELETE',
      })
      toast.success("Todo deleted successfully!");
      setItem(undefined);
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Failed to delete todo!");
      }
    } finally {
      setLoading('');
    }
  }

  const handleToggleCompleteTodo = async (id: string) => {
    setLoading('updating');
    const item = todos.find(todo => todo.id === id);
    if (!item) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: item.todo, is_completed: !item.is_completed }),
      })
      toast.success("Todo status updated successfully!");
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Failed to update todo status!");
      }
    } finally {
      setLoading('');
    }
  }

  let timeout: NodeJS.Timeout;
  const handleSearchTodo = async (query: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      router.push(`/?query=${query}`)
    }, 500);
  }

  const noFilterFound = () => {
    if (todos.length === 0 && query) {
      return <TableCaption className="text-center text-gray-500">
        No result. Create a new one instead!
      </TableCaption>
    }
  }
    
  return (<>
    <TodoForm todos={todos || []} todoItem={item} resetTodoItem={() => setItem(undefined)} />
    <div>
      <Input 
        className="w-full md:w-1/2 mb-2" 
        type="text" 
        placeholder="Filter todos..." 
        defaultValue={filter} 
        onChange={(e) => handleSearchTodo(e.target.value)}
      />
    
      <Table>
        {noFilterFound()}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Todo</TableHead>
            <TableHead>Is Completed</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-collapse">
          {todos.map((todo: TodoResponse) => (
            <TableRow 
              key={todo.id} 
              className="group strikeout"
            >
              {/* style={{ display: todo.todo.toLowerCase().includes(filter.toLowerCase()) ? '' : 'none' }} */}
              <TableCell 
                className={`font-medium ${todo.is_completed ? 'line-through italic text-gray-500' : ''}`}
              >
                #{todo.id}
              </TableCell>
              <TableCell 
                className={`font-medium ${todo.is_completed ? 'line-through italic text-gray-500' : ''}`}
              >
                {todo.todo}
              </TableCell>
              <TableCell 
                className={`font-medium ${todo.is_completed ? 'line-through italic text-gray-500' : ''}`}
              >
                {todo.is_completed ? 'Completed' : 'Not completed'}
              </TableCell>
              <TableCell 
                className={`text-right font-medium ${todo.is_completed ? 'line-through italic text-gray-500' : ''}`}
              >
                {formatDate(todo.created_at)}
              </TableCell>
              <TableCell
                className="flex gap-2 invisible group-hover:visible">
                  <Button size="sm" variant="default" onClick={() => setItem(todo)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteTodo(todo.id)}>
                    {loading === 'deleting' ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleToggleCompleteTodo(todo.id)}>
                    {loading === 'updating' ? 
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> 
                      : todo.is_completed ? 'Mark as incomplete' : 'Mark as complete'}
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right font-bold">{todos.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  </>)
}
