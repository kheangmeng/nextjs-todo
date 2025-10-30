'use client'

import { useEffect, useState, type ChangeEvent } from 'react';
// import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { type Session } from "next-auth";

const supabase = createClient()
const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  bio: z.string(),
  image: z.string().nullish(),
})

const getProfile = async (session: Session) => {
  let remoteProfile: {profile: any} | undefined = undefined;
  if (session?.user?.accessToken) {
    const { id, accessToken } = session.user;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/profiles/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const { profile } = (await res.json()) || undefined;
        remoteProfile = profile
        console.log('remote profile', remoteProfile?.profile);
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external profile error', err);
    }
  }
  return remoteProfile?.profile;
}

export function ProfileForm({session}: {session: Session}) {
  const [loading, setLoading] = useState(false)
  // const { data: session, status } = useSession();
  const [image, setImage] = useState('');
  const { data: profileData, error, isLoading } = useSWR(
    `/api/profiles/users/${session?.user?.id}`,
    () => getProfile(session)
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      image: "",
    },
  })

  useEffect(() => {
    if (profileData) {
      form.reset({
        firstName: profileData?.firstName ?? '',
        lastName: profileData?.lastName ?? '',
        bio: profileData?.bio ?? '',
      })
    }
  }, [profileData])

  const onCreateProfile = async (values: z.infer<typeof formSchema>) => {
    if (session?.user?.accessToken) {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify(values)
        });
        if (res.ok) {
          toast.success("Profile Updated!");
          const result = (await res.json()) || undefined;
          console.log('create profile', result);
        } else {
          const error = await res.json();
          toast.error(error.message);
        }
      } catch (err) {
        toast.error("Failed to update profile!");
      } finally {
        setLoading(false)
      }
    }
  }
  const onUpdateProfile = async (values: z.infer<typeof formSchema>) => {
    if (session?.user?.accessToken) {
      setLoading(true)
      const userId = session.user.id
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/profiles/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify(values)
        });
        if (res.ok) {
          toast.success("Profile Updated!");
          const result = (await res.json()) || undefined;
          console.log('update profile', result);
        } else {
          const error = await res.json();
          toast.error(error.message);
        }
      } catch (err) {
        toast.error("Failed to update profile!");
      } finally {
        setLoading(false)
      }
    }
  }

  function getImageUrl(bucketName: string, filePath: string) {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
    return data?.publicUrl || 'https://avatars.githubusercontent.com/u/20764729?s=48&v=4'
  }

  // interface GetTransformedImageUrlProps {
  //   bucketName: string
  //   filePath: string
  //   width: number
  //   height: number
  // }
  // // resize or optimize the image
  // async function getTransformedImageUrl({bucketName, filePath, width, height}: GetTransformedImageUrlProps) {
  //   const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath, {
  //     transform: {
  //       width: width,
  //       height: height,
  //     },
  //   })
  //   return data.publicUrl
  // }
  const BUCKET_NAME = 'blogs'
  const onChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const path = ''
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file))
    const { error, data } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(!!path ? `${path}/${file.name}` : file.name, file, {
        cacheControl: '3600',
        upsert:false,
      })
    console.log('res upload::', data)

    if (error) {
      return { name: file.name, message: error.message }
    } else {
      await onUpdateProfile({
        image: data?.path,
        firstName: form.getValues('firstName'),
        lastName: form.getValues('lastName'),
        bio: form.getValues('bio'),
      })
      return { name: file.name, message: undefined }
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if(profileData.id) {
      onUpdateProfile(values)
    } else {
      onCreateProfile(values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col items-center">
              <div className="relative">
                <input type='hidden' name={field.name} value={field.value || ''} onChange={field.onChange} />
                <input type="file" accept="image/*" disabled={loading || !profileData?.id} className="hidden" id="profile-user" onChange={onChangeAvatar} />
                <label htmlFor="profile-user">
                  <Avatar className="rounded-full w-22 h-22">
                    <AvatarImage
                      src={ image || getImageUrl(BUCKET_NAME, profileData?.image || '') }
                    />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>
                  <UserPenIcon className={!profileData?.id ? "hidden" : "bg-muted/50 text-yellow-500 rounded-full absolute bottom-0 right-0"} />
                </label>
              </div>
            </div>
          )}
        />
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
        <Button type="submit" disabled={loading}>
          {loading && <Spinner />}
          Update
        </Button>
      </form>
    </Form>
  )
}
