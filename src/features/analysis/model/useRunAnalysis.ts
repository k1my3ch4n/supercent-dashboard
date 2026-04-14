import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import { useReviewStore } from "@features/review/model/reviewStore";

export function useRunAnalysis(appId: string) {
  const { isLoading: isAnalyzing, analyzeReviews } = useAnalysisStore();
  const { isLoading: isFetching } = useReviewStore();

  const runAnalysis = async () => {
    useAnalysisStore.getState().reset();

    await useReviewStore.getState().fetchReviews(appId);

    const { reviews, error } = useReviewStore.getState();
    if (error || reviews.length === 0) {
      console.warn("No reviews available for analysis", { error });
      return;
    }

    await analyzeReviews(reviews);
  };

  return { isAnalyzing: isFetching || isAnalyzing, runAnalysis };
}
