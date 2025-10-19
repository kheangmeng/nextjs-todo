import { Card } from "@/components/ui/card"
import { ProfileForm } from "@/components/blog-landing/profile-form"
import { ChangePasswordForm } from "@/components/blog-landing/change-password-form"

export default async function Page({ searchParams }: { searchParams: { query: string } }) {
  const { query } = await searchParams

  return (
    <div className="w-full flex flex-col md:flex-row space-x-6 space-y-6 px-6 mt-6">
      <div className="w-full">
        <Card className="px-6">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <ProfileForm />
        </Card>
      </div>
      <div className="w-full">
        <Card className="px-6">
          <h1 className="text-2xl font-semibold">Change Password</h1>
          <ChangePasswordForm />
        </Card>
      </div>
    </div>
  )
}
