import { useAnalysisStore } from "@features/analysis/model/analysisStore";

export function useRunAnalysis() {
  const { isLoading, analyzeReviews } = useAnalysisStore();

  const runAnalysis = () => {
    analyzeReviews([]);
  };

  return { isAnalyzing: isLoading, runAnalysis };
}
