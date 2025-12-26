'use client'

import React, { useEffect, useState, use, Suspense } from 'react';
// import useSWR from 'swr'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { toast } from "sonner"
import { SendHorizonal, Plus, BookmarkIcon } from "lucide-react"
import { RelatedPostCard } from '@/components/blog-landing/related-post-card';
// import { BlogPost } from '@/components/blog-landing/data';
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
import type { Session } from 'next-auth';

interface BlogDetailWrapperProps {
  post: BlogResponse;
  relatedPosts: BlogResponse[];
  commentsPromise: Promise<CommentResponse[]>;
  bookmarkByUserPromise: Promise<Bookmark> | Promise<undefined>;
  ratePromise: Promise<Rate> | Promise<undefined>;
  children: React.ReactNode;
}
export default function BlogDetailWrapper ({ commentsPromise, bookmarkByUserPromise, ratePromise, post, relatedPosts, children }: BlogDetailWrapperProps) {
  const { data: session, status } = useSession();
  const bookmarkByUser = use(bookmarkByUserPromise);
  const rateByUser = use(ratePromise);
  const comments = use(commentsPromise);
  // const  [states, setStates] = useState({
  //   bookmark: false,
  // })

  // const toggleState = (state: keyof typeof states) => {
  //   setStates((prevStates) => ({
  //     ...prevStates,
  //     [state]: !prevStates[state],
  //   }));
  // }
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
              { session
                  ? <Suspense fallback={<div className='text-lg font-semibold mt-6'>Loading...</div>}>
                      <BookmarkAuthSection bookmarkByUser={bookmarkByUser} session={session} />
                    </Suspense>
                  :<SignUpDialog>
                    <IconButton
                      icon={BookmarkIcon}
                      color={[42, 127, 255]}
                      size="md"
                    />
                  </SignUpDialog>
              }
            </div>
          </div>

          {children}

          <div className='mt-6'>
            { session
                ? <Suspense fallback={<div className='text-lg font-semibold mt-6'>Loading...</div>}>
                    <RatingAuthSection rateByUser={rateByUser} avgRate={post?.avgRate} session={session} status={status} />
                  </Suspense>
                : <RatingSection avgRate={post?.avgRate} />
            }
          </div>

          <div className='mt-6'>
            <Suspense fallback={<div className='text-lg font-semibold mt-6'>Loading comments...</div>}>
              <CommentSection commentsData={comments} />
            </Suspense>
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
// ---------START BOOKMARK-------------
function BookmarkAuthSection({ session, bookmarkByUser }: { session: Session, bookmarkByUser?: Bookmark }) {
  const { id: postId } = useParams()
  const [bookmark, setBookmark] = useState(false);
  // const { data: bookmarkByUser, error, isLoading } = useSWR(
  //   `/api/bookmark/post?postId=${postId}`,
  //   () => fetchBookmarkByUser(session?.user?.accessToken || '', `${postId}`)
  // )

  useEffect(() => {
    if(bookmarkByUser) {
      setBookmark(bookmarkByUser.isBookmarked)
    }
  }, [bookmarkByUser])
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
          // console.log('bookmark posts', result);
        } else {
          console.error('External API error', res.status);
        }
      } catch (err) {
        toast.error("Failed to bookmark blog!");
        console.error('bookmark blogs error', err);
      }
    }
  }

  return <>
    <IconButton
      icon={BookmarkIcon}
      active={bookmark}
      color={[42, 127, 255]}
      onClick={() => onBookmark(!bookmark)}
      size="md"
    />
  </>
}
// ---------END BOOKMARK-------------


// ---------START RATE-------------
interface RateSectionProp {
  avgRate: number;
  rateByUser?: Rate;
  session: Session;
  status: "authenticated" | "loading" | "unauthenticated";
}
function RatingAuthSection ({ avgRate, session, status, rateByUser }: RateSectionProp) {
  const { id: postId } = useParams()
  // const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  // const { data: rateByUser, error, isLoading } = useSWR(
  //   session ? `/api/rate/post?postId=${postId}` : null,
  //   () => fetchRateByUser(session?.user?.accessToken || '', `${postId}`)
  // )

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
          // console.log('rated posts', result);
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
function RatingSection ({ avgRate }: { avgRate: number }) {
  return <>
    <p className='font-bold text-slate-800 dark:text-white text-lg mb-2'>Rate:</p>
    <SignUpDialog>
      <Rating value={avgRate}>
        {Array.from({ length: avgRate }).map((_, index) => (
          <RatingButton key={index} className="text-yellow-500" />
        ))}
      </Rating>
    </SignUpDialog>
  </>
}
// ---------END RATE-------------

// ---------START COMMENT-------------
function CommentSection({ commentsData }: { commentsData: CommentResponse[] }) {
  const { id: postId } = useParams()
  const { data: session, status } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([])
  // const { data: commentData, error, isLoading } = useSWR(
  //   `/api/comments?postId=${postId}&order=-createdAt`,
  //   () => fetchCommentList(`${postId}`)
  // )

  const mapComments = (data: CommentResponse[]): Comment[] => {
    return data.map((c) => ({
      id: c.id,
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
            id: result.id,
            username: session.user.username || '',
            createdAt: result.comment?.createdAt,
            text,
          }
          setComment('')
          setComments((v) => [row, ...mapComments(commentsData || [])])
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
    <p className='font-bold text-slate-800 dark:text-white text-lg mb-2'>Comments</p>
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

    {(comments.length && comments || mapComments(commentsData || [])).map((c) => <UserComment key={'comment' + c.id} comment={c} />)}
    {/* <Suspense fallback={<div className='text-lg font-semibold mt-6'>Loading comments...</div>}>
      { mapComments(comments || [])).map((c) => <UserComment key={'comment' + c.id} comment={c} />}
    </Suspense> */}
    {/* { isLoading ?
        <div className='text-lg font-semibold'>Loading...</div> :
        (comments.length && comments || mapComments(commentData || [])).map((c) => <UserComment key={'comment' + c.id} comment={c} />)
    } */}
  </>
}

function UserComment({ comment }: {comment: Comment}) {
  return (
    <div className='flex items-start mt-6 gap-3'>
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
// ---------END BOOKMARK-------------
