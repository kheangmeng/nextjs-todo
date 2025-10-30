'use client'

import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { LockKeyholeIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

export function BlogProfileMenu() {
  const { data: session, status } = useSession();

  return (
    <>
      { status === 'authenticated' ?
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 transition-colors">
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/20764729?s=48&v=4"
              />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm text-mute/50 dark:text-gray-300">{session.user.username}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{session.user.role}</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/blog/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/blog/list">My Blogs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/blog/create">Create Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        :
        <>
          <Button className="mr-3" asChild>
            <Link href="/signup"><UserIcon /> Sign Up</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login"><LockKeyholeIcon /> Login</Link>
          </Button>
        </>
    }
    </>
  )
}
