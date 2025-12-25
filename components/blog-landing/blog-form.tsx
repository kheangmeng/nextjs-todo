'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import useSWR from 'swr';
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2Icon, PlusCircle } from "lucide-react";
import { isValidJSON } from '@/lib/utils'
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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
// import LaxicalEditor from "@/components/lexical-editor";
import Tiptap from "@/components/tiptab-editor/tiptab";
import ImagePlaceHolder from "@/components/image-placeholder";
import { TagForm } from "./tag-form";
import type { Tag, BlogResponse } from '@/types'

async function getTags(session: any): Promise<Tag[]> {
  let remote: Tag[] = [];
  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`,
        },
      });
      if (res.ok) {
        const { tags } = (await res.json()) || [];
        remote = tags.tags || [];
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external tags error', err);
    }
  }

  return remote
}

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
  tagIds: z.number().array().min(1, {
    message: "At least one tag is required.",
  }),
})

// const tags = z.coerce.number<number>()
export const BlogForm = ({data}: {data?: BlogResponse}) => {
  const { id: postId } = useParams()
  const router = useRouter();
  const { data: session, status } = useSession();
  const imgRef = useRef<string>('');
  const [loading, setLoading] = useState(false)
  const { data: tags, error, isLoading } = useSWR(
    `/api/profiles/users/${session?.user?.id}`,
    () => getTags(session)
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title,
      description: data?.description,
      content: data?.content,
      image: data?.image,
      isPublished: data?.isPublished,
      tagIds: data?.tags.map((t) => t.id) || [],
    },
  })

  const loadContent = () => {
    // if(isValidJSON(data?.content || '')) {
    //   return data?.content
    // }
    return  data?.content || '';
  }
  const handleGetImage = (title: string, url: string) => {
    imgRef.current = url;
    form.setValue('title', title);
    form.setValue('image', url);
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (postId) {
      updateBlog({...values, image: imgRef.current}, Number(postId))
    } else {
      createBlog({...values, image: imgRef.current})
    }
  }

  async function createBlog(data: z.infer<typeof formSchema>) {
    if (session?.user?.accessToken) {
      try {
        setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }
  }

  async function updateBlog(data: z.infer<typeof formSchema>, id: number) {
    if (session?.user?.accessToken) {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          toast.success("Blog updated successfully!");
          const result = (await res.json()) || undefined;
          console.log('updated posts', result);
          router.push('/blog');
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        toast.error("Failed to update blog!");
        console.error('update blogs error', err);
      } finally {
        setLoading(false)
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
            // setTags((v) => [...v, val])
           }} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImagePlaceHolder url={data?.image} onChange={handleGetImage} />
        <FieldSeparator className="my-5" />

        {/* <FormField
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
        /> */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
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
                {/* <Textarea placeholder="content" {...field} /> */}
                {/* <LaxicalEditor initialEditorState={loadContent()} onChange={(val) => field.onChange(val)}/> */}
                {/* `
                    <h3 style="text-align:center">
                      Hello World! 🌎 ️
                    </h3>
                    <p>This is a basic example of implementing images. Drag to re-order.</p>
                    <img src="https://placehold.co/600x400" />
                    <img src="https://placehold.co/800x400" />
                  ` */}
                <Tiptap
                  content={loadContent()}
                  getContent={(html) => field.onChange(html)}
                />
              </FormControl>
              <FormDescription>
                This is your public post content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <MultiSelect
                values={field.value.map(String)}
                onValuesChange={(vals: string[]) =>
                  field.onChange(vals.map((v) => Number(v)))
                }
              >
                <FormControl>
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select tags..." />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {tags?.length && tags?.map((tag) => (
                      <MultiSelectItem key={tag.id} value={String(tag.id)}>
                        {tag.title}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Controller
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
        /> */}
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
        <div className="flex justify-end">
          <Button type="button" variant={'outline'} className="mr-3">Cancel</Button>
          <Button type="submit" disabled={loading}>
            { loading ?
                <Loader2Icon className="h-4 w-4 animate-spin" /> :
                postId ? "Update" : "Submit"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
