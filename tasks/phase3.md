# Phase 3: AI 분석 API

Google Play 리뷰 데이터를 Gemini AI에 전달하여 감성 점수, 카테고리, 페인 포인트, 액션 아이템을 분석하는 API입니다.

---

## 엔드포인트

```
POST /api/analyze
```

---

## 요청 (Request)

### Headers

| 헤더         | 값               | 필수 |
| ------------ | ---------------- | ---- |
| Content-Type | application/json | ✅   |

### Body

```ts
{
  reviews: Review[]  // 분석할 리뷰 배열 (1개 이상, 최대 500개)
}
```

#### Review 타입 (`src/shared/types/review.ts`)

```ts
interface Review {
  id: string; // 리뷰 고유 ID
  userName: string; // 작성자 이름
  score: number; // 평점 (1~5)
  text: string; // 리뷰 본문
  date: string; // ISO 8601 날짜 문자열
}
```

### 요청 예시

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "reviews": [
      {
        "id": "abc123",
        "userName": "홍길동",
        "score": 2,
        "text": "앱이 자꾸 튕겨요. 로딩도 너무 느리고 불편합니다.",
        "date": "2024-01-01T00:00:00.000Z"
      },
      {
        "id": "def456",
        "userName": "김철수",
        "score": 5,
        "text": "UI가 깔끔하고 사용하기 편해요. 강력 추천!",
        "date": "2024-01-02T00:00:00.000Z"
      }
    ]
  }'
```

> **참고:** 리뷰 데이터는 `GET /api/crawling` 엔드포인트로 수집한 결과를 그대로 전달하면 됩니다.

---

## 응답 (Response)

### 성공 응답 — `200 OK`

```ts
{
  result: AnalysisResult;
  reviewCount: number; // 분석에 사용된 리뷰 수
}
```

#### AnalysisResult 타입 (`src/shared/types/analysis.ts`)

```ts
interface AnalysisResult {
  sentimentScore: number; // 감성 점수 (0~100)
  sentimentLabel: "긍정" | "부정" | "중립"; // 감성 레이블
  categories: Category[]; // 카테고리별 언급 통계 (최대 5개)
  painPoints: PainPoint[]; // 주요 페인 포인트 (최대 5개)
  actionItems: ActionItem[]; // 실행 가능한 액션 아이템 (최대 5개)
  summary: string; // 전체 리뷰 요약 (200자 이내)
}

interface Category {
  name: string; // 카테고리명 (예: "버그", "UI/UX", "성능")
  count: number; // 해당 카테고리 언급 리뷰 수
}

interface PainPoint {
  title: string; // 페인 포인트 제목 (30자 이내)
  description: string; // 구체적인 설명 (100자 이내)
  severity: "high" | "medium" | "low"; // 심각도
}

interface ActionItem {
  title: string; // 액션 아이템 제목 (30자 이내)
  description: string; // 구체적인 실행 방안 (100자 이내)
  priority: "high" | "medium" | "low"; // 우선순위
}
```

#### sentimentScore 기준

| 점수 범위 | sentimentLabel |
| --------- | -------------- |
| 61 ~ 100  | 긍정           |
| 41 ~ 60   | 중립           |
| 0 ~ 40    | 부정           |

### 성공 응답 예시

```json
{
  "result": {
    "sentimentScore": 45,
    "sentimentLabel": "중립",
    "categories": [
      { "name": "기술적 문제", "count": 3 },
      { "name": "UI/UX", "count": 1 },
      { "name": "환불 정책", "count": 1 }
    ],
    "painPoints": [
      {
        "title": "앱 불안정 및 오류",
        "description": "알 수 없는 오류와 앱 멈춤 현상으로 사용이 불가능하다는 불만이 제기됨.",
        "severity": "high"
      },
      {
        "title": "환불 처리 미흡",
        "description": "앱 사용 불가 상황에도 환불이 어렵다는 불만이 제기됨.",
        "severity": "high"
      }
    ],
    "actionItems": [
      {
        "title": "치명적 버그 수정",
        "description": "앱 멈춤 및 알 수 없는 오류 등 앱 사용을 막는 치명적인 버그를 최우선으로 수정.",
        "priority": "high"
      },
      {
        "title": "환불 정책 및 절차 개선",
        "description": "환불 불만 해소를 위해 정책을 명확히 하고 처리 절차를 간소화.",
        "priority": "high"
      }
    ],
    "summary": "전반적으로 앱 안정성 및 성능에 대한 불만이 높습니다. UI는 긍정적 평가를 받았으나, 핵심 기능의 불안정성이 사용자 경험을 저해하고 있습니다."
  },
  "reviewCount": 5
}
```

---

## 에러 응답

### 에러 응답 타입

```ts
{
  error: string; // 에러 메시지
}
```

### 에러 케이스 목록

| HTTP 상태코드 | 에러 메시지                                       | 발생 조건                                         |
| ------------- | ------------------------------------------------- | ------------------------------------------------- |
| 400           | `reviews array is required and must not be empty` | `reviews` 필드가 없거나 빈 배열                   |
| 400           | `Invalid review item structure in reviews array`  | `reviews` 배열 원소가 `Review` 구조를 따르지 않음 |
| 400           | `Too many reviews. Maximum allowed is 500`        | 리뷰 수가 500개 초과                              |
| 400           | `Invalid request body`                            | JSON 파싱 실패 (잘못된 형식)                      |
| 500           | `GEMINI_API_KEY is not configured`                | 환경변수 `GEMINI_API_KEY` 미설정                  |
| 500           | `Failed to parse analysis result`                 | Gemini 응답이 유효한 JSON이 아닌 경우             |
| 500           | `Failed to analyze reviews`                       | Gemini API 호출 실패 (네트워크, 모델 오류 등)     |

### 에러 응답 예시

**400 — reviews 누락**

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{}'
```

```json
{ "error": "reviews array is required and must not be empty" }
```

**400 — 500개 초과**

```json
{ "error": "Too many reviews. Maximum allowed is 500" }
```

**500 — API 키 미설정**

```json
{ "error": "GEMINI_API_KEY is not configured" }
```

---

## 환경변수

| 변수명           | 설명                                      | 필수 |
| ---------------- | ----------------------------------------- | ---- |
| `GEMINI_API_KEY` | Google AI Studio에서 발급한 Gemini API 키 | ✅   |

`.env.local` 파일에 추가:

```
GEMINI_API_KEY=your_api_key_here
```

---

## 사용 모델

- **모델**: `gemini-2.5-flash`
- **제공**: Google Generative AI (`@google/generative-ai`)
