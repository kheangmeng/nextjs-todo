'use client'

import React, { useState } from 'react';
import useSWR from 'swr'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { toast } from "sonner"
import { SendHorizonal, Plus, Bookmark } from "lucide-react"
import { RelatedPostCard } from '@/components/blog-landing/related-post-card';
import { BlogPost } from '@/components/blog-landing/data';
import { TimeAgo } from '@/components/TimeAgo';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { IconButton } from "@/components/ui/shadcn-io/icon-button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

interface BlogDetailWrapperProps {
  relatedPosts: BlogPost[];
  children: React.ReactNode;
}
export default function BlogDetailWrapper ({ relatedPosts, children }: BlogDetailWrapperProps) {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  const  [states, setStates] = useState({
    bookmark: false,
  })

  const toggleState = (state: keyof typeof states) => {
    setStates((prevStates) => ({
      ...prevStates,
      [state]: !prevStates[state],
    }));
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-lg p-6 md:p-10 mb-8">
          <div className='flex items-center justify-between mb-8'>
            <Link
              href={'/blog'}
              className="text-blue-600 dark:text-blue-300 font-semibold hover:text-blue-800 dark:hover:text-blue-100 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
                Back to All Articles
            </Link>
            <div>
              <IconButton
                icon={Bookmark}
                active={states.bookmark}
                color={[0,0,0]}
                onClick={() => toggleState("bookmark")}
                size="md"
              />
            </div>
          </div>

          {children}

          <div className='mt-6'>
            <RatingSection />
          </div>

          <div className='mt-6'>
            <CommentSection />
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RatingSection = () => {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);

  const onRating = async (rate: number) => {
    if (session?.user?.accessToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/rates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({
            rate,
            postId: Number(postId),
            userId: session.user.id,
          })
        });
        if (res.ok) {
          setRating(rate)
          toast.success("Blog rated!");
          const result = (await res.json()) || undefined;
          console.log('rated posts', result);
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        toast.error("Failed to rate blog!");
        console.error('rate blogs error', err);
      }
    }
  }

  return <>
    <p className='font-bold text-slate-800 dark:text-white text-lg mb-2'>Rate:</p>
    <Rating value={rating} onValueChange={onRating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton key={index} className="text-yellow-500" />
      ))}
    </Rating>
  </>
}


async function getCommentList(accessToken: string, postId: string) {
  let remotePosts: { comments: any[] } | undefined = undefined;
  if (accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/comments?postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    remotePosts = (await res.json()) || [];
    console.log('remote comments', remotePosts?.comments);
  }
  return remotePosts?.comments
}

interface Comment {
  username: string;
  createdAt: string;
  text: string;
}
const CommentSection = () => {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {username: 'Jonh Doe', createdAt: new Date().toISOString(), text: 'Informative article thanks for sharing.'}
  ])
  const { data: commentData, error, isLoading } = useSWR(
    `/api/comments?postId=${postId}`,
    () => getCommentList(session?.user?.accessToken || '', `${postId}`)
  )

   const onComment = async (text: string) => {
    if (session?.user?.accessToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({
            text,
            postId: Number(postId),
            userId: session.user.id,
          })
        });
        if (res.ok) {
          const result = (await res.json()) || undefined;
          const row = {
            username: session.user.username || '',
            createdAt: result.comment?.createdAt,
            text,
          }
          setComments((v) => [row, ...v])
          console.log('comment', result);
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        toast.error("Failed to add comment!");
        console.error('comment error', err);
      }
    }
  }

  return <>
    <p className='font-bold text-slate-800 dark:text-white text-lg mb-2'>Comments (210)</p>
    <InputGroup>
      <InputGroupTextarea
        value={comment}
        onChange={(e) => setComment(e.target.value)} placeholder="Add to the discussion..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          className="rounded-full"
          size="icon-xs"
        >
          <Plus />
        </InputGroupButton>
        <InputGroupText className="ml-auto"></InputGroupText>
        {/* <Separator orientation="vertical" className="!h-4" /> */}
        <InputGroupButton
          variant="default"
          className="rounded-full"
          size="icon-xs"
          disabled={false}
          onClick={() => onComment(comment) }
        >
          <SendHorizonal />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>

    { comments.map((c, index) => (
        <div key={index} className='flex items-start mt-6 gap-3'>
          <Avatar className="rounded-md">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/20764729?s=48&v=4"
            />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
          <div className='text-sm'>
            <div className="dark:text-gray-300">
              <span className='font-semibold'>@{c.username}</span>
              <TimeAgo className='text-xs text-gray-500 dark:text-gray-500 ml-2' dateString={c.createdAt} />
            </div>
            <div>{c.text}</div>
          </div>
        </div>
      ))
    }
  </>
}
