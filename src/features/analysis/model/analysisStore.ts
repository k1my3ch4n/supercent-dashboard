import { create } from "zustand";
import { Review } from "@shared/types/review";
import { AnalysisResult, AnalysisSuccessResponse } from "@shared/types/analysis";

let analysisAbortController: AbortController | null = null;

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
    analysisAbortController?.abort();
    analysisAbortController = new AbortController();
    const signal = analysisAbortController.signal;

    set({ isLoading: true, error: null });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews }),
        signal,
      });
      const data = await response.json();

      if (!response.ok) {
        set({ error: data.error ?? "분석 중 오류가 발생했습니다.", isLoading: false });
        return;
      }

      const successData = data as AnalysisSuccessResponse;
      set({ result: successData.result, isLoading: false });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      set({ error: "분석 중 오류가 발생했습니다.", isLoading: false });
    }
  },
}));
