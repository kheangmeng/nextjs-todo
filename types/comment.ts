import { UserProfile } from "./user";

export interface CommentResponse {
  id: number;
  text: string;
  rate?: number;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
}

export interface Comment {
  username: string;
  createdAt: string;
  text: string;
}
