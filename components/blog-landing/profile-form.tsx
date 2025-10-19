'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserPenIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent } from "react";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  bio: z.string(),
  image: z.string(),
})

export const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      image: "",
    },
  })

  function onChangeProfile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log('file::', file);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <input type="file" accept="image/*" className="hidden" id="profile-user" onChange={onChangeProfile} />
            <label htmlFor="profile-user">
              <Avatar className="rounded-full w-22 h-22">
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/20764729?s=48&v=4"
                />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
              <UserPenIcon className="bg-muted/50 text-yellow-500 rounded-full absolute bottom-0 right-0" />
            </label>
          </div>
        </div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" variant={'outline'} className="mr-3">Cancel</Button>
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
