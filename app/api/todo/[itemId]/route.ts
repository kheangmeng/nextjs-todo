import { revalidatePath } from "next/cache"
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function PUT(request: Request, { params }: { params: Promise<{ itemId: string }>}) {
  const { itemId } = await params
  const { todo, is_completed } = await request.json()
  let res
  try {
    res = await sql`UPDATE todos SET todo = ${todo}, is_completed = ${is_completed} WHERE id = ${itemId};`;
    revalidatePath('/', 'layout')
    return Response.json({ message: 'Todo updated successfully' })
  } catch (error) {
    console.log('TODO UPDATE ERROR:::', error)
    return Response.json({ message: 'Error updating todo' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ itemId: string }>}) {
  const { itemId } = await params
  let res
  try {
    res = await sql`DELETE FROM todos WHERE id = ${itemId};`;
    revalidatePath('/', 'layout')
    return Response.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.log('TODO DELETE ERROR:::', error)
    return Response.json({ message: 'Error deleting todo' }, { status: 500 })
  }
}