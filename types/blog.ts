import { Tag } from "./tag";

export interface BlogResponse {
  id: number;
  slug: string;
  title: string;
  isPublished: boolean;
  image?: string;
  description?: string;
  content: string;
  avgRate: number;
  rateCount: number;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
  tags: Tag[];
  // publishedAt: string;
  // author: string;
  // date: string;
  // imageUrl: string;
  // category: string;
  // tags: string[];
  // excerpt: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
}
