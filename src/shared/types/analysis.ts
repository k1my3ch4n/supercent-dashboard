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
  reviewCount: number;
  targetSegment: string;
  timeline: string;
  impactLabel: string;
  impactPercent: number;
  confidence: number;
}

export interface ClusterItem {
  name: string;
  count: number;
  quote: string;
  keywords: string[];
}

export interface Prediction {
  currentRating: number;
  predictedRating14d: number;
  confidence: number;
}

export interface AnomalyItem {
  level: "alert" | "warn" | "info";
  highlight: string;
  text: string;
}

export interface CSAutoReplyItem {
  reviewId: string;
  userName: string;
  score: number;
  reviewText: string;
  draftText: string;
  languageLabel: string;
  date: string;
}

export interface AnalysisResult {
  sentimentScore: number;
  sentimentLabel: "긍정" | "부정" | "중립";
  positivePercent: number;
  prediction: Prediction;
  anomalies: AnomalyItem[];
  csReplies: CSAutoReplyItem[];
  categories: Category[];
  painPoints: PainPoint[];
  actionItems: ActionItem[];
  clusters: ClusterItem[];
  insights: string[];
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
