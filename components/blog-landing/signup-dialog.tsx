import Link from 'next/link';
import { LockKeyholeIcon, UserIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export default function SignUpDialog({ children }: { children: React.ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
          <DialogDescription className='my-6'>
            We're provide news about dev and technology.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          <Button variant="outline" asChild className='w-full'>
            <Link href="/login"><LockKeyholeIcon /> Login</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link href="/signup"><UserIcon /> Sign Up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
