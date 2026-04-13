import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import { useReviewStore } from "@features/review/model/reviewStore";

export function useRunAnalysis() {
  const { isLoading, analyzeReviews } = useAnalysisStore();
  const { reviews } = useReviewStore();

  const runAnalysis = () => {
    if (reviews.length > 0) {
      analyzeReviews(reviews);
    } else {
      console.warn("No reviews available for analysis");
    }
  };

  return { isAnalyzing: isLoading, runAnalysis };
}
