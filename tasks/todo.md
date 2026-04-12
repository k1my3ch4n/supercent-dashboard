# Supercent Dashboard - Todo

## Phase 1: 프로젝트 초기 세팅 ✅

- [x] Next.js 프로젝트 생성 (App Router, TypeScript)
- [x] 패키지 설치: `zustand`, `google-play-scraper`, `@google/generative-ai`, `tailwindcss`
- [x] FSD 디렉토리 구조 생성 (`src/app`, `src/pages`, `src/widgets`, `src/features`, `src/shared`)
- [x] 글로벌 스타일 및 Provider 설정 (`src/app/layout.tsx`)
- [x] 환경변수 세팅 (`.env.local`): `GEMINI_API_KEY`
- [x] ESLint / Prettier 설정

---

## Phase 2: 크롤링 API 구현 (`src/app/api/crawling`) ✅

- [x] `GET /api/crawling` 라우트 구현
  - [x] `google-play-scraper`로 앱 리뷰 수집 (앱 ID, 언어, 개수 파라미터)
  - [x] 수집 결과 정제 (id, userName, score, text, date 필드만 추출)
  - [x] 에러 핸들링 (잘못된 앱 ID, 네트워크 오류)
- [x] API 응답 타입 정의 (`src/shared/types/review.ts`)

---

## Phase 3: AI 분석 API 구현 (`src/app/api/analyze`)

- [ ] `POST /api/analyze` 라우트 구현
  - [ ] Gemini API 연동 (`@google/generative-ai`)
  - [ ] 리뷰 배열을 받아 분석 프롬프트 구성
  - [ ] 분석 결과 파싱: 감성 점수, 카테고리, 페인 포인트, 액션 아이템
- [ ] 분석 결과 타입 정의 (`src/shared/types/analysis.ts`)

---

## Phase 4: 상태 관리 (Zustand)

- [ ] 리뷰 스토어 구현 (`src/features/review/model/reviewStore.ts`)
  - [ ] 리뷰 데이터, 로딩 상태, 에러 상태
  - [ ] `fetchReviews(appId)` 액션
- [ ] 분석 스토어 구현 (`src/features/analysis/model/analysisStore.ts`)
  - [ ] 분석 결과, 로딩 상태, 에러 상태
  - [ ] `analyzeReviews(reviews)` 액션

---

## Phase 5: UI 컴포넌트 구현

### Shared 컴포넌트 (`src/shared/ui`)

- [ ] `Card` 컴포넌트
- [ ] `Badge` 컴포넌트 (감성 레이블용)
- [ ] `LoadingSpinner` 컴포넌트
- [ ] `ErrorMessage` 컴포넌트

### Features (`src/features`)

- [ ] `AppIdInput` — 앱 ID 입력 및 크롤링 시작 (`src/features/review/ui`)
- [ ] `ReviewList` — 수집된 리뷰 목록 (`src/features/review/ui`)
- [ ] `SentimentChart` — 감성 점수 시각화 (`src/features/analysis/ui`)
- [ ] `PainPointList` — 페인 포인트 목록 (`src/features/analysis/ui`)
- [ ] `ActionItemList` — 액션 아이템 목록 (`src/features/analysis/ui`)

### Widgets (`src/widgets`)

- [ ] `DashboardHeader` — 앱 정보 + 크롤링 트리거
- [ ] `ReviewSection` — 리뷰 목록 + 필터
- [ ] `AnalysisSection` — 분석 결과 종합 뷰

---

## Phase 6: 페이지 구성

- [ ] `DashboardPage` 구현 (`src/pages/dashboard`)
  - [ ] Widget 조합으로 레이아웃 구성
  - [ ] 크롤링 → 분석 플로우 연결
- [ ] `SettingPage` 구현 (`src/pages/setting`)
  - [ ] 앱 ID 관리, 크롤링 설정 (언어, 리뷰 수)

---

## 추후 검토 항목

- [ ] App Store 크롤링 추가 (`app-store-scraper` 패키지)
  - [ ] `GET /api/crawling/app-store` 라우트 구현 (앱 ID는 숫자 형태, e.g. `553834731`)
  - [ ] 타입 정의 추가 (`src/shared/types/review.ts`)
  - [ ] Google Play vs App Store 리뷰 비교 분석 기능 (Gemini에 양쪽 데이터 전달)

---

## Phase 7: 배포

- [ ] Vercel 프로젝트 연결
- [ ] 환경변수 Vercel에 등록 (`GEMINI_API_KEY`)
- [ ] 프로덕션 빌드 확인 및 배포

---

## 완료 기준

- 앱 ID 입력 → 리뷰 크롤링 → Gemini 분석 → 대시보드 표시까지 E2E 플로우 동작
- 주요 에러 케이스(잘못된 앱 ID, API 한도 초과) 처리 확인
- Vercel 배포 URL에서 정상 동작 확인
