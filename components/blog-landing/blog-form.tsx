'use client'

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from 'next-auth/react';
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2Icon, PlusCircle } from "lucide-react";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { TagForm } from "./tag-form";
import { useState } from "react"
import type { Tag } from '@/types'

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  image: z.string().optional(),
  isPublished: z.boolean(),
  tagIds: z.number().array(),
})

// const tags = z.coerce.number<number>()
export const BlogForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([
    {
      "id": 1,
      "title": "JS",
      "description": "JavaScript",
      "image": null,
      "updatedAt": null,
      "createdAt": "2025-10-11T18:33:55.458Z",
      "deletedAt": null
    },
    {
      "id": 2,
      "title": "TS",
      "description": "TypeScript",
      "image": null,
      "updatedAt": "2025-10-13T12:15:55.646Z",
      "createdAt": "2025-10-11T18:36:24.378Z",
      "deletedAt": null
    },
    {
      "id": 3,
      "title": "Vue",
      "description": "vue.js",
      "image": null,
      "updatedAt": null,
      "createdAt": "2025-10-11T18:44:48.923Z",
      "deletedAt": null
    },
    {
      "id": 4,
      "title": "React",
      "description": "react.js",
      "image": null,
      "updatedAt": null,
      "createdAt": "2025-10-11T18:44:57.210Z",
      "deletedAt": null
    },
    {
      "id": 5,
      "title": "Angular",
      "description": "Angular",
      "image": null,
      "updatedAt": null,
      "createdAt": "2025-10-11T18:45:11.216Z",
      "deletedAt": null
    },
    {
      "id": 7,
      "title": "Node.js",
      "description": "Node.js",
      "image": null,
      "updatedAt": null,
      "createdAt": "2025-10-13T12:10:13.856Z",
      "deletedAt": null
    }
  ])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: "",
      isPublished: false,
      tagIds: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    createBlog(values)
  }

  async function createBlog(data: z.infer<typeof formSchema>) {
    if (session?.user?.accessToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          toast.success("Blog created successfully!");
          const result = (await res.json()) || undefined;
          console.log('created posts', result);
          router.push('/blog');
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        toast.error("Failed to create blog!");
        console.error('create blogs error', err);
      }
    }
  }

  const CreateTagDialog = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="link" size="sm" disabled={loading}>
            { loading ?
                <Loader2Icon className="h-4 w-4 animate-spin" /> :
                <PlusCircle className="h-4 w-4" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Tag</DialogTitle>
          </DialogHeader>
          <TagForm submitted={(val: Tag) => {
            setTags((v) => [...v, val])
           }} />
        </DialogContent>
      </Dialog>
    )
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
                This is your public post title.
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
                This is your public post description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="content" {...field} />
              </FormControl>
              <FormDescription>
                This is your public post content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="tagIds"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLegend variant="label" className="flex items-center">
                <span>Tags</span>
                <CreateTagDialog />
              </FieldLegend>
              <FieldDescription>
                Add tags related to your post.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                {tags.map((tag) => (
                  <Field
                    key={tag.id}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <div className="flex gap-2">
                      <Checkbox
                      id={`form-rhf-checkbox-${tag.id}`}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value.includes(tag.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, tag.id]
                          : field.value.filter((value) => value !== tag.id)
                        field.onChange(newValue)
                      }}
                    />
                    <FieldLabel
                      htmlFor={`form-rhf-checkbox-${tag.id}`}
                      className="font-normal"
                    >
                      {tag.title}
                    </FieldLabel>
                    </div>
                  </Field>
                ))}
              </FieldGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </FieldSet>
          )}
        />
        <Controller
          name="isPublished"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldGroup data-slot="checkbox-group">
                <FieldLegend variant="label" className="mb-0">Publish</FieldLegend>
                <Field orientation="horizontal">
                  <Checkbox
                    id="form-rhf-checkbox-responses"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel
                    htmlFor="form-rhf-checkbox-responses"
                    className="font-normal"
                  >
                    Publish Blog
                  </FieldLabel>
                </Field>
              </FieldGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </FieldSet>
          )}
        />
        <Button type="button" variant={'outline'} className="mr-3">Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
