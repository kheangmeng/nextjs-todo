import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    return NextResponse.json({ message: 'Sale created successfully' }, { status: 200 })
  } catch (error) {
    console.log('SALE CREATE ERROR:::', error)
    return NextResponse.json({ message: 'Error creating sale' }, { status: 500 })
  }
}
