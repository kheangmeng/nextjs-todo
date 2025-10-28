'use client'

import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { toast } from "sonner"
import { SendHorizonal, Plus, BookmarkIcon } from "lucide-react"
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
import SignUpDialog from './signup-dialog';
import type { BlogResponse, Comment, CommentResponse, Rate, Bookmark } from '@/types';

interface BlogDetailWrapperProps {
  post: BlogResponse;
  relatedPosts: BlogPost[];
  children: React.ReactNode;
}
export default function BlogDetailWrapper ({ post, relatedPosts, children }: BlogDetailWrapperProps) {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [bookmark, setBookmark] = useState(false);
  // const  [states, setStates] = useState({
  //   bookmark: false,
  // })
  const { data: bookmarkByUser, error, isLoading } = useSWR(
    `/api/bookmark/post?postId=${postId}`,
    () => getBookmarkByUser(session?.user?.accessToken || '', `${postId}`)
  )

  useEffect(() => {
    if(bookmarkByUser) {
      setBookmark(bookmarkByUser.isBookmarked)
    }
  }, [bookmarkByUser])

  // const toggleState = (state: keyof typeof states) => {
  //   setStates((prevStates) => ({
  //     ...prevStates,
  //     [state]: !prevStates[state],
  //   }));
  // }
  const onBookmark = async (isBookmarked: boolean) => {
    if (session?.user?.accessToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/bookmarks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({
            isBookmarked,
            postId: Number(postId),
          })
        });
        if (res.ok) {
          // toggleState("bookmark")
          setBookmark(isBookmarked)
          toast.success("Blog bookmark!");
          const result = (await res.json()) || undefined;
          console.log('bookmark posts', result);
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        toast.error("Failed to bookmark blog!");
        console.error('bookmark blogs error', err);
      }
    }
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
              { status !== 'authenticated' ?
                  <SignUpDialog>
                    <IconButton
                      icon={BookmarkIcon}
                      active={bookmark}
                      color={[42, 127, 255]}
                      size="md"
                    />
                  </SignUpDialog> :
                  <IconButton
                    icon={BookmarkIcon}
                    active={bookmark}
                    color={[42, 127, 255]}
                    onClick={() => onBookmark(!bookmark)}
                    size="md"
                  />
              }
            </div>
          </div>

          {children}

          <div className='mt-6'>
            <RatingSection avgRate={post?.avgRate} />
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

async function getBookmarkByUser(accessToken: string, postId: string): Promise<Bookmark> {
  let remoteBookmark: {bookmark: any} | undefined = undefined;
  if (postId && accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/bookmarks/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const { bookmark } = (await res.json()) || undefined;
        remoteBookmark = bookmark
        console.log('user bookmark', bookmark?.bookmark);
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external bookmark error', err);
    }
  }
  return remoteBookmark?.bookmark;
}

async function getRateByUser(accessToken: string, postId: string): Promise<Rate> {
  let remoteRate: {rate: any} | undefined = undefined;
  if (postId && accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/rates/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const { rate } = (await res.json()) || undefined;
        remoteRate = rate
        console.log('user rate', rate?.rate);
      } else {
        console.error('External API error', res.status);
      }
    } catch (err) {
      console.error('fetch external rate error', err);
    }
  }
  return remoteRate?.rate;
}
function RatingSection ({ avgRate }: {avgRate: number}) {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  const { data: rateByUser, error, isLoading } = useSWR(
    `/api/rate/post?postId=${postId}`,
    () => getRateByUser(session?.user?.accessToken || '', `${postId}`)
  )

  useEffect(() => {
    if(rateByUser) {
      setRating(rateByUser?.rate)
    }
  }, [rateByUser])

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
    { status !== 'authenticated' ?
        <SignUpDialog>
          <Rating value={rating}>
            {Array.from({ length: avgRate }).map((_, index) => (
              <RatingButton key={index} className="text-yellow-500" />
            ))}
          </Rating>
        </SignUpDialog> :
        <Rating value={rating} onValueChange={onRating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} className="text-yellow-500" />
          ))}
        </Rating>
    }
  </>
}

async function getCommentList(accessToken: string, postId: string): Promise<CommentResponse[]> {
  let remotePosts: { comments: any[] } | undefined = undefined;
  if (accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/comments?postId=${postId}&order=-createdAt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    const { comments } = (await res.json()) || [];
    remotePosts = comments
  }
  return remotePosts?.comments || []
}

function CommentSection() {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([])
  const { data: commentData, error, isLoading } = useSWR(
    `/api/comments?postId=${postId}&order=-createdAt`,
    () => getCommentList(session?.user?.accessToken || '', `${postId}`)
  )

  useEffect(() => {
    if(commentData) {
      setComments(() => [...mapComments(commentData || [])])
    }
  },  [commentData])

  const mapComments = (data: CommentResponse[]): Comment[] => {
    return data.map((c) => ({
      username: c.user.username,
      createdAt: c.createdAt,
      text: c.text,
    }))
  }

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
          setComment('')
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
    <p className='font-bold text-slate-800 dark:text-white text-lg mb-2'>Comments ({commentData?.length})</p>
    <InputGroup>
      { status !== 'authenticated' ?
          <SignUpDialog>
            <InputGroupTextarea
              value={comment}
              onChange={(e) => setComment(e.target.value)} placeholder="Add to the discussion..."
            />
          </SignUpDialog> :
          <InputGroupTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)} placeholder="Add to the discussion..."
          />
      }

      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          className="hidden rounded-full"
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

    { comments.map((c, index) => UserComment(c, index)) }
  </>
}

function UserComment(comment: Comment, index: number) {
  return (
    <div key={index} className='flex items-start mt-6 gap-3'>
      <Avatar className="rounded-md">
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/20764729?s=48&v=4"
        />
        <AvatarFallback>KM</AvatarFallback>
      </Avatar>
      <div className='text-sm'>
        <div className="dark:text-gray-300">
          <span className='font-semibold'>@{comment.username}</span>
          <TimeAgo className='text-xs text-gray-500 dark:text-gray-500 ml-2' dateString={comment.createdAt} />
        </div>
        <div>{comment.text}</div>
      </div>
    </div>
  )
}
