import { create } from "zustand";
import { Review } from "@/shared/types/review";
import { AnalysisResult, AnalysisSuccessResponse } from "@/shared/types/analysis";

interface AnalysisState {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  analyzeReviews: (reviews: Review[]) => Promise<void>;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  result: null,
  isLoading: false,
  error: null,

  analyzeReviews: async (reviews: Review[]) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews }),
      });
      const data = await response.json();

      if (!response.ok) {
        set({ error: data.error ?? "분석 중 오류가 발생했습니다.", isLoading: false });
        return;
      }

      const successData = data as AnalysisSuccessResponse;
      set({ result: successData.result, isLoading: false });
    } catch {
      set({ error: "분석 중 오류가 발생했습니다.", isLoading: false });
    }
  },
}));
