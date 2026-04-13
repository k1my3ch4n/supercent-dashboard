# Phase 4: 상태 관리 (Zustand)

크롤링과 AI 분석 결과를 클라이언트 전역 상태로 관리하는 Zustand 스토어입니다.  
각 스토어는 데이터 상태, 로딩 상태, 에러 상태를 함께 관리하며 API 호출 액션을 포함합니다.

---

## 스토어 구조 개요

| 스토어 | 파일 위치 | 관리 대상 |
|--------|-----------|-----------|
| `useReviewStore` | `src/features/review/model/reviewStore.ts` | 크롤링된 리뷰 목록 |
| `useAnalysisStore` | `src/features/analysis/model/analysisStore.ts` | AI 분석 결과 |

---

## useReviewStore

### 동작 방식

`fetchReviews(appId)` 액션이 호출되면 `/api/crawling?appId=...` 엔드포인트에 GET 요청을 보내고, 응답 결과를 `reviews` 상태에 저장합니다.  
요청 시작 시 `isLoading`이 `true`로 전환되며, 완료 또는 실패 시 `false`로 돌아옵니다.

이전 요청이 진행 중인 상태에서 `fetchReviews`가 다시 호출되면 `AbortController`를 통해 이전 요청을 즉시 취소하고 새 요청을 시작합니다. 취소된 요청은 에러 상태를 변경하지 않습니다.

```
fetchReviews(appId) 호출
  → 진행 중인 요청이 있으면 abort() 호출로 취소
  → 새 AbortController 생성
  → isLoading: true
  → GET /api/crawling?appId={appId}
  → 성공: reviews에 결과 저장, isLoading: false
  → 취소(AbortError): 상태 변경 없이 종료
  → 실패: error에 메시지 저장, isLoading: false
```

### 상태 타입

```ts
interface ReviewState {
  reviews: Review[];       // 수집된 리뷰 목록
  isLoading: boolean;      // API 요청 진행 중 여부
  error: string | null;    // 에러 메시지 (정상 시 null)
  fetchReviews: (appId: string) => Promise<void>;
}
```

### 데이터 타입 — `Review` (`src/shared/types/review.ts`)

```ts
interface Review {
  id: string;        // 리뷰 고유 ID
  userName: string;  // 작성자 이름
  score: number;     // 평점 (1~5)
  text: string;      // 리뷰 본문
  date: string;      // ISO 8601 날짜 문자열
}
```

### 사용 예시

```ts
import { useReviewStore } from '@/features/review/model/reviewStore';

const { reviews, isLoading, error, fetchReviews } = useReviewStore();

// 리뷰 수집 시작
fetchReviews('com.example.app');
```

### 사용 시점

| 상황 | 설명 |
|------|------|
| 사용자가 앱 ID를 입력하고 크롤링을 시작할 때 | `fetchReviews(appId)` 호출 |
| 리뷰 목록 UI를 렌더링할 때 | `reviews` 배열을 읽어 목록 표시 |
| 크롤링 진행 중 로딩 UI를 표시할 때 | `isLoading` 값으로 스피너 제어 |
| 크롤링 실패 시 에러 메시지를 표시할 때 | `error` 값으로 에러 UI 표시 |

---

## useAnalysisStore

### 동작 방식

`analyzeReviews(reviews)` 액션이 호출되면 `/api/analyze` 엔드포인트에 POST 요청을 보내고, 응답 결과를 `result` 상태에 저장합니다.  
요청 시작 시 `isLoading`이 `true`로 전환되며, 완료 또는 실패 시 `false`로 돌아옵니다.

이전 요청이 진행 중인 상태에서 `analyzeReviews`가 다시 호출되면 `AbortController`를 통해 이전 요청을 즉시 취소하고 새 요청을 시작합니다. 취소된 요청은 에러 상태를 변경하지 않습니다.

```
analyzeReviews(reviews) 호출
  → 진행 중인 요청이 있으면 abort() 호출로 취소
  → 새 AbortController 생성
  → isLoading: true
  → POST /api/analyze { reviews }
  → 성공: result에 분석 결과 저장, isLoading: false
  → 취소(AbortError): 상태 변경 없이 종료
  → 실패: error에 메시지 저장, isLoading: false
```

### 상태 타입

```ts
interface AnalysisState {
  result: AnalysisResult | null;  // 분석 결과 (분석 전 null)
  isLoading: boolean;             // API 요청 진행 중 여부
  error: string | null;           // 에러 메시지 (정상 시 null)
  analyzeReviews: (reviews: Review[]) => Promise<void>;
}
```

### 데이터 타입 — `AnalysisResult` (`src/shared/types/analysis.ts`)

```ts
interface AnalysisResult {
  sentimentScore: number;                    // 감성 점수 (0~100)
  sentimentLabel: "긍정" | "부정" | "중립"; // 감성 레이블
  categories: Category[];                    // 카테고리별 언급 통계
  painPoints: PainPoint[];                   // 주요 페인 포인트
  actionItems: ActionItem[];                 // 실행 가능한 액션 아이템
  summary: string;                           // 전체 리뷰 요약
}

interface Category {
  name: string;   // 카테고리명 (예: "버그", "UI/UX", "성능")
  count: number;  // 해당 카테고리 언급 리뷰 수
}

interface PainPoint {
  title: string;                       // 페인 포인트 제목
  description: string;                 // 구체적인 설명
  severity: "high" | "medium" | "low"; // 심각도
}

interface ActionItem {
  title: string;                        // 액션 아이템 제목
  description: string;                  // 구체적인 실행 방안
  priority: "high" | "medium" | "low";  // 우선순위
}
```

### 사용 예시

```ts
import { useAnalysisStore } from '@/features/analysis/model/analysisStore';
import { useReviewStore } from '@/features/review/model/reviewStore';

const { reviews } = useReviewStore();
const { result, isLoading, error, analyzeReviews } = useAnalysisStore();

// 수집된 리뷰로 분석 시작
analyzeReviews(reviews);
```

### 사용 시점

| 상황 | 설명 |
|------|------|
| 리뷰 수집 완료 후 AI 분석을 시작할 때 | `analyzeReviews(reviews)` 호출 |
| 감성 점수 차트를 렌더링할 때 | `result.sentimentScore` / `result.sentimentLabel` 사용 |
| 페인 포인트 목록을 표시할 때 | `result.painPoints` 배열 사용 |
| 액션 아이템 목록을 표시할 때 | `result.actionItems` 배열 사용 |
| 분석 진행 중 로딩 UI를 표시할 때 | `isLoading` 값으로 스피너 제어 |
| 분석 실패 시 에러 메시지를 표시할 때 | `error` 값으로 에러 UI 표시 |

---

## 전체 플로우

두 스토어는 순차적으로 연결되어 사용됩니다.

```
[사용자] 앱 ID 입력
    ↓
useReviewStore.fetchReviews(appId)
    ↓ (진행 중 재호출 시 → 이전 요청 abort 후 재시작)
[리뷰 목록 수집 완료 → reviews 상태에 저장]
    ↓
useAnalysisStore.analyzeReviews(reviews)
    ↓ (진행 중 재호출 시 → 이전 요청 abort 후 재시작)
[AI 분석 완료 → result 상태에 저장]
    ↓
[대시보드에 감성 점수 / 페인 포인트 / 액션 아이템 표시]
```
