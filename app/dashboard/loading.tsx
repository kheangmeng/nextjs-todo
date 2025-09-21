import { Loader2Icon } from 'lucide-react'

export default function Loading() {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2Icon className="mr-2 h-8 w-8 animate-spin" />
        <p className='text-lg'>Loading...</p>
      </div>
    )
}