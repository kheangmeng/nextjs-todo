'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Tag } from '@/types'

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
})

// const tags = z.coerce.number<number>()
export const TagForm = ({ submitted }: { submitted: (val: Tag) => void}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    submitted({
      "id": 8,
      "title": "Express.js",
      "description": "Express.js",
      "image": null,
      "updatedAt": null,
      "createdAt": "2025-10-17T12:10:13.856Z",
      "deletedAt": null
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public tag title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                This is your public tag description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="button" variant={'outline'} className="mr-3">Cancel</Button>
        </DialogClose>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
