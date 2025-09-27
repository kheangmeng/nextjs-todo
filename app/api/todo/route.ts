import type { NextRequest } from 'next/server'
import { revalidatePath } from "next/cache"
import sql from '@/lib/db';

export async function GET(request: NextRequest) {
  let res;
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  try {
    if (query !== 'undefined' && query !== undefined) {
      res = await sql`SELECT * FROM todos WHERE todo ILIKE ${'%' + query + '%'} ORDER BY is_completed ASC;`;
    } else {
      res = await sql`SELECT * FROM todos ORDER BY is_completed ASC;`;
    }
    return Response.json({ todos: res })
  } catch (error) {
    console.log('TODO LIST ERROR::', error)
    return Response.json({ message: 'Error fetching todos'}, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { todo } = await request.json()
  let res
  try {
    res = await sql`INSERT INTO todos (todo, is_completed) VALUES (${todo}, false);`;
    revalidatePath('/', 'layout')
    return Response.json({ message: 'Todo added successfully' })
  } catch (error) {
    console.log('TODO ADD ERROR:::', error)
    return Response.json({ message: 'Error adding todo'}, { status: 500 })
  }
}
