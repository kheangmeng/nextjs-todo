'use client'

export default function Error({error}: { error: Error}) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-2xl">{error?.message}</h1>
    </div>
  )
}
