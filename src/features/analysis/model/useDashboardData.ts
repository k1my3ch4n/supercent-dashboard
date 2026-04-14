import { useEffect, useRef, useCallback } from "react";
import { useRunAnalysis } from "@features/analysis/model/useRunAnalysis";
import { useReviewStore } from "@features/review/model/reviewStore";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import { useDashboardCacheStore } from "@shared/model/dashboardCacheStore";

export function useDashboardData(appId: string) {
  const { isAnalyzing, runAnalysis } = useRunAnalysis(appId);

  const reviews = useReviewStore((state) => state.reviews);
  const result = useAnalysisStore((state) => state.result);

  const analyzingAppIdRef = useRef<string | null>(null);
  const prevIsAnalyzingRef = useRef(isAnalyzing);

  useEffect(() => {
    if (prevIsAnalyzingRef.current === true && isAnalyzing === false) {
      const finishedAppId = analyzingAppIdRef.current;
      if (finishedAppId && result && reviews.length > 0) {
        useDashboardCacheStore.getState().setCache(finishedAppId, reviews, result);
      }
      analyzingAppIdRef.current = null;
    }
    prevIsAnalyzingRef.current = isAnalyzing;
  }, [isAnalyzing, result, reviews]);

  useEffect(() => {
    const cachedData = useDashboardCacheStore.getState().cache[appId];

    if (cachedData) {
      useReviewStore.setState({ reviews: cachedData.reviews, isLoading: false, error: null });
      useAnalysisStore.setState({ result: cachedData.result, isLoading: false, error: null });
      return;
    }

    analyzingAppIdRef.current = appId;
    runAnalysis();
  }, [appId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRunAI = useCallback(() => {
    useDashboardCacheStore.getState().removeCache(appId);
    analyzingAppIdRef.current = appId;
    runAnalysis();
  }, [appId, runAnalysis]);

  return { isAnalyzing, handleRunAI };
}
