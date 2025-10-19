import { NextRequest, NextResponse } from 'next/server'

const externalApi = process.env.NEXT_PUBLIC_EXTERNAL_API

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    if (formData) {
      console.log('receive data:>>>>>> ', formData.get('event'), formData.get('timestamp'))
    }
    return NextResponse.json({ message: 'Hello World' })
  } catch (error) {
    console.log('ERROR::', error)
    return NextResponse.json({ message: 'Something went wrong sending beacon.' }, { status: 500 })
  }
}
