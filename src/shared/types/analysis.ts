export interface Category {
  name: string;
  count: number;
}

export interface PainPoint {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export interface ActionItem {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface AnalysisResult {
  sentimentScore: number;
  sentimentLabel: "긍정" | "부정" | "중립";
  categories: Category[];
  painPoints: PainPoint[];
  actionItems: ActionItem[];
  summary: string;
}

export interface AnalysisSuccessResponse {
  result: AnalysisResult;
  reviewCount: number;
}

export interface AnalysisErrorResponse {
  error: string;
}

export type AnalysisResponse = AnalysisSuccessResponse | AnalysisErrorResponse;
