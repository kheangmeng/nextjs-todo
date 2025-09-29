import type { NextRequest } from 'next/server'
import sql from '@/lib/db';

export async function GET(request: NextRequest) {
  let res;
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  try {
    if (query !== 'undefined' && query !== undefined && query !== null) {
      res = await sql`SELECT * FROM items WHERE name ILIKE ${'%' + query + '%'} ORDER BY created_at DESC;`;
    } else {
      res = await sql`SELECT * FROM items ORDER BY created_at DESC;`;
    }
    return Response.json({ items: res })
  } catch (error) {
    console.log('TODO LIST ERROR::', error)
    return Response.json({ message: 'Error fetching items'}, { status: 500 })
  }
}