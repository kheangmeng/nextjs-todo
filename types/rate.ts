export interface Rate {
  id: number;
  rate: number;
  userId: number;
  blogId: number;
}

export interface RateRequest {
  rate: number;
  blogId: number;
}

export interface RateResponse {
  id: number;
  rate: number;
  userId: number;
  blogId: number;
  createdAt: string;
  updatedAt: string;
}
