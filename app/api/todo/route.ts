import type { NextRequest } from 'next/server'
import { revalidatePath } from "next/cache"
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: NextRequest) {
  let res;
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  try {
    if (query) {
      res = await sql`SELECT * FROM todos WHERE todo ILIKE ${'%' + query + '%'} ORDER BY created_at DESC;`;
    } else {
      res = await sql`SELECT * FROM todos ORDER BY created_at DESC;`;
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