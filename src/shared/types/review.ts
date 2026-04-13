export interface Review {
  id: string;
  userName: string;
  score: number;
  text: string;
  date: string;
  country?: string;
  sentimentTag?: string;
}

export interface CrawlingSuccessResponse {
  reviews: Review[];
  total: number;
  appId: string;
  lang: string;
}

export interface CrawlingErrorResponse {
  error: string;
}

export type CrawlingResponse = CrawlingSuccessResponse | CrawlingErrorResponse;
