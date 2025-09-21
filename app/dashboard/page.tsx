'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TodoTable } from '@/components/TodoTable'
import type { TodoResponse } from '@/types'
import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth-action'

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className='absolute top-[0] bg-white text:black flex justify-between items-center gap-3 w-screen px-6 py-3'>
        <div>
          Home
        </div>
        <form action={logout}>
          <Button type='submit' className='bg-red-600'>Logout</Button>
        </form>
      </header>
      <main className="flex flex-col gap-[15px] row-start-2 items-center sm:items-start">
        <h1>{data.user.email}</h1>
        <h1 className="text-4xl font-bold">Todo List</h1>
        <TodoTable todos={todos as TodoResponse[]} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm">
          @Copyright Todo
      </footer>
    </div>
  )
}
