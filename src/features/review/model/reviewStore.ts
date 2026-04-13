import { create } from "zustand";
import { Review, CrawlingSuccessResponse } from "@/shared/types/review";

let reviewAbortController: AbortController | null = null;

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  fetchReviews: (appId: string) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  isLoading: false,
  error: null,

  fetchReviews: async (appId: string) => {
    reviewAbortController?.abort();
    reviewAbortController = new AbortController();
    const signal = reviewAbortController.signal;

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`/api/crawling?appId=${encodeURIComponent(appId)}`, { signal });
      const data = await response.json();

      if (!response.ok) {
        set({ error: data.error ?? "리뷰를 불러오는 중 오류가 발생했습니다.", isLoading: false });
        return;
      }

      const successData = data as CrawlingSuccessResponse;
      set({ reviews: successData.reviews, isLoading: false });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      set({ error: "리뷰를 불러오는 중 오류가 발생했습니다.", isLoading: false });
    }
  },
}));
