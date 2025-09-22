'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RealtimeChat } from '@/components/realtime-chat'
// import { ChatMessage } from '@/hooks/use-realtime-chat'

// const chatMessages: ChatMessage[] = [
//   { id: '1', content: 'Hello', user: { name: 'jonhDoe' }, createdAt: new Date().toISOString() },
//   { id: '2', content: 'Hi', user: { name: 'Dora' }, createdAt: new Date().toISOString() },
//   { id: '3', content: 'How are you?', user: { name: 'jonhDoe' }, createdAt: new Date().toISOString() },
//   { id: '4', content: 'I am fine', user: { name: 'Dora' }, createdAt: new Date().toISOString() },
//   { id: '5', content: 'what your job?', user: { name: 'jonhDoe' }, createdAt: new Date().toISOString() },
//   { id: '6', content: 'I am a software engineer', user: { name: 'Dora' }, createdAt: new Date().toISOString() },
// ]

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const username = data.user.email?.split('@')[0] || ''

  return (
    <main className="w-1/2 flex flex-col gap-[15px] row-start-2 items-center justify-center sm:items-start">
      <h1 className="text-4xl font-bold">Chats</h1>
      <RealtimeChat
        roomName='general'
        username={username}
        // messages={chatMessages}
      />
    </main>
  )
}
