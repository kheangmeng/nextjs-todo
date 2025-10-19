'use client'

import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BlogProfileMenu() {
  const { data: session, status } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 transition-colors">
        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/20764729?s=48&v=4"
          />
          <AvatarFallback>KM</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm text-mute/50 dark:text-gray-300">Jonh Doe</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">Blogger</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/blog/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem><Link href="/blog/list">My Blogs</Link></DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/blog/create">Create Blog</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
