export interface Bookmark {
  id: number;
  isBookmarked: boolean;
  userId: number;
  blogId: number;
}

export interface BookmarkRequest {
  isBookmarked: boolean;
  blogId: number;
}

export interface BookmarkResponse {
  id: number;
  isBookmarked: boolean;
  userId: number;
  blogId: number;
  createdAt: string;
  updatedAt: string;
}
