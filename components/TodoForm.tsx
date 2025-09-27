"use client"

import React from "react";
import { Loader2Icon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import type { AddTodo, EditTodo, TodoResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

interface TodoFormProps {
    todos: TodoResponse[];
    todoItem?: TodoResponse;
    resetTodoItem: () => void;
}

export function TodoForm({ todos, todoItem, resetTodoItem }: TodoFormProps) {
  const router = useRouter();
  const [todo, setTodo] = React.useState("");
  const [existTodo, setExistTodo] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (todoItem) setTodo(todoItem.todo);
    else setTodo("");
  }, [todoItem])

  React.useEffect(() => {
    const onEscRemoveTodo = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTodo("");
      }
    }
    window.addEventListener('keydown', onEscRemoveTodo);
    
    return () => {
      window.removeEventListener('keydown', onEscRemoveTodo);
    }
  }, [])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
    const existingTodo = todos.find((t: TodoResponse) => t.todo === value && t.id !== todoItem?.id);
    if (existingTodo) {
      setExistTodo(true);
    } else {
      setExistTodo(false);
    }
  }

  const handleAddTodo = async () => {
    setLoading(true);
    const data: AddTodo = { todo, is_completed: false }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      toast.success("Todo added successfully!");
      setTodo("");
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Failed to add todo!");
      }
    } finally {
        setLoading(false);
    }
  }    
  const handleUpdateTodo = async () => {
    setLoading(true);
    const data: EditTodo = { todo, is_completed: !!todoItem?.is_completed }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/todo/${todoItem?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      toast.success("Todo updated successfully!");
      resetTodoItem();
      setTodo("");
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Failed to update todo!");
      }
    } finally {
        setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoItem) {
      handleUpdateTodo();
    } else {
      handleAddTodo();
    }
  }
  return (<>
    <form className="w-full flex items-center gap-4" onSubmit={handleSubmit}>
      <Input 
        type="text" 
        id="todo" 
        placeholder="Enter your todo..." 
        value={todo}
        onChange={handleChange}
      />
      <Button type="submit" disabled={!todo.trim() || existTodo || loading}>
        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        {todoItem ? "Update Todo" : "Add Todo"}
      </Button>
    </form>
    <div className="h-6">
      {existTodo && <div className="text-red-500 text-sm">Todo already exists</div>}
    </div>
  </>)
}