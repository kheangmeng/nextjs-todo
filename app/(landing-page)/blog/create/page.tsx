import { BlogForm } from "@/components/blog-landing/blog-form"
import { Card } from "@/components/ui/card"

export default async function Page() {
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center space-y-3">
      <h1 className="text-2xl font-semibold">Create Blog</h1>
      <Card className="w-1/2 pt-6 px-6"><BlogForm /></Card>
    </div>
  )
}
