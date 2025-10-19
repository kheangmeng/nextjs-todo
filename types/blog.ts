export interface BlogResponse {
  id: number;
  slug: string;
  title: string;
  userId: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  // publishedAt: string;
  // author: string;
  // date: string;
  // imageUrl: string;
  // category: string;
  // tags: string[];
  // excerpt: string;
  image?: string;
  description?: string;
  content: string;
}
