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

## Phase 3: AI 분석 API 구현 (`src/app/api/analyze`) ✅

- [x] `POST /api/analyze` 라우트 구현
  - [x] Gemini API 연동 (`@google/generative-ai`)
  - [x] 리뷰 배열을 받아 분석 프롬프트 구성
  - [x] 분석 결과 파싱: 감성 점수, 카테고리, 페인 포인트, 액션 아이템
- [x] 분석 결과 타입 정의 (`src/shared/types/analysis.ts`)

---

## Phase 4: 상태 관리 (Zustand) ✅

- [x] 리뷰 스토어 구현 (`src/features/review/model/reviewStore.ts`)
  - [x] 리뷰 데이터, 로딩 상태, 에러 상태
  - [x] `fetchReviews(appId)` 액션
- [x] 분석 스토어 구현 (`src/features/analysis/model/analysisStore.ts`)
  - [x] 분석 결과, 로딩 상태, 에러 상태
  - [x] `analyzeReviews(reviews)` 액션

---

## Phase 5: UI 컴포넌트 구현 ✅

> 기준: `prototype.html` (2026-04-13 확정)
> 다크 테마 (#0a0a0a), 핑크 액센트 (#ff2d7a), FSD 구조 준수

---

### 5-1. Shared 컴포넌트 (`src/shared/ui`)

- [x] `Card` — 기본 카드 래퍼 (border, radius, overflow)
- [x] `Badge` — 색상 variant (pink · green · yellow · blue · purple)
- [x] `StoreBadge` — 스토어별 아이콘 뱃지 (Google Play · App Store · Galaxy Store, on/off 상태)
- [x] `LoadingSpinner` — AI 분석 실행 중 표시
- [x] `ErrorMessage` — API 오류 표시
- [x] `ProgressBar` — AI 임팩트 바, 카테고리 비중 바 공용
- [x] `PriorityTag` — HIGH · MED · LOW 우선순위 태그

---

### 5-2. 게임 선택 화면 (`src/features/game/ui`)

- [x] `GameCard` — 게임 썸네일(그라디언트+이모지) + 이름 + StoreBadge 목록
  - props: `name`, `emoji`, `gradient`, `stores[]`
  - 클릭 시 대시보드로 이동
- [x] `GameCardAdd` — 점선 "게임 추가" 카드 (빈 슬롯)
- [x] `GameGrid` — 4열 그리드, GameCard 목록 렌더링

---

### 5-3. 레이아웃 (`src/shared/ui/layout`)

- [x] `Sidebar` — 로고 · 게임 스위처(클릭 시 선택 화면 복귀) · 네비게이션 · 푸터
- [x] `Topbar` — 뒤로가기 · 게임명 · 기간 탭(7D/30D/90D) · AI 분석 실행 버튼
- [x] `StoreSelector` — Google Play · App Store · Galaxy Store 칩 (SOON 상태 지원)

---

### 5-4. AI 분석 컴포넌트 (`src/features/analysis/ui`)

- [x] `AISummaryBlock` — Gemini 종합 분석 배너
  - 5가지 인사이트 bullet 목록
  - Health Score · Positive % · Alerts 3종 스코어 박스
  - "Powered by Gemini" 모델 뱃지
- [x] `AIActionItemList` — 우선순위 액션 아이템 목록 (전체 너비 절반 이상)
  - `AIActionItem` 단위 카드: 우선순위 태그 · 설명 · 영향 세그먼트 칩 · 대응 기한 칩
  - 하단 임팩트 바: 예상 개선율 + 신뢰도 % + Jira 생성 버튼
- [x] `AIPainPointClusters` — AI 자동 클러스터링 결과
  - `ClusterItem`: 클러스터명 · 리뷰 수 · 대표 인용구 · 키워드 태그
- [x] `AICSAutoReply` — 부정 리뷰 AI 자동 답변 초안
  - 원본 리뷰 영역 + AI 초안 텍스트 + 답변 등록 · 수정 · 재생성 버튼
  - 다국어 답변 지원 (리뷰 언어에 맞춰 초안 생성)
- [x] `AIPredictionPanel` — AI 예측 & 이상 탐지 패널
  - 평점 예측 포캐스트: 현재 → 14일 후 예측값 + 신뢰도
  - `AnomalyItem` 목록: ALERT · WARN · INFO 등급별 아이콘 + 설명

---

### 5-5. 리뷰 컴포넌트 (`src/features/review/ui`)

- [x] `ReviewItem` — 아바타 · 닉네임 · 날짜 · 별점 · 감성 태그 · 본문 · 카테고리
  > ~~국가 필드~~ — Review 타입 미지원, Phase 5에서는 생략 (추후 타입 확장 시 추가)
- [x] `ReviewList` — ReviewItem 목록 + NEW 카운트 배지

---

### 5-6. 대시보드 통계 (`src/features/analysis/ui`)

- [x] `StatCard` — 지표 카드 (label · value · 변화율)
  - `highlight` variant: 핑크 테두리 강조
  - `ai-predict` variant: AI 예측 평점 표시
- [x] `StatsRow` — StatCard 4개 가로 배열

---

### Widgets (`src/widgets`)

- [x] `GameSelectWidget` — GameGrid + 헤더 조합 (게임 선택 전체 화면)
- [x] `DashboardWidget` — 대시보드 전체 조합
  - StoreSelector → AISummaryBlock → StatsRow
  - 상단 그리드: AIActionItemList + AIPainPointClusters
  - 하단 그리드: AICSAutoReply + AIPredictionPanel

---

## Phase 6: 페이지 구성

- [ ] `GameSelectPage` 구현 (`src/pages/game-select`)
  - [ ] GameSelectWidget 렌더링
  - [ ] 게임 클릭 → 라우팅 (`/dashboard/[gameId]`)
- [ ] `DashboardPage` 구현 (`src/pages/dashboard`)
  - [ ] Sidebar + Topbar + DashboardWidget 조합
  - [ ] 스토어 전환 (StoreSelector) → 해당 스토어 데이터 fetch
  - [ ] 크롤링 → AI 분석 플로우 연결
- [ ] `SettingPage` 구현 (`src/pages/setting`)
  - [ ] 게임 목록 관리 (추가 · 삭제 · 앱 ID 설정)
  - [ ] 크롤링 설정 (언어, 리뷰 수, 스케줄)

---

## 추후 검토 항목 (Phase 5 → 실데이터 연동)

> Phase 5에서 목 데이터로 구현된 항목들. Phase 6 이후 실데이터로 교체 필요.

- [ ] **게임 목록 스토어 구현** (`src/features/game/model/gameStore.ts`)
  - 현재 `MOCK_GAMES` 하드코딩 → Zustand 스토어로 교체
  - Settings에서 게임 추가/삭제/앱ID 설정 연동

- [ ] **AnalysisResult 타입 확장** (`src/shared/types/analysis.ts`)
  - `AIPainPointClusters`용: `clusterName`, `reviewCount`, `quote`, `keywords`
  - `AICSAutoReply`용: 부정 리뷰 + AI 초안 텍스트 (다국어)
  - `AIPredictionPanel`용: 예측 평점, 이상 탐지 목록 (ALERT/WARN/INFO)
  - `AISummaryBlock`용: Health Score, Positive %, Alerts count
  - Gemini 프롬프트도 함께 수정 필요

- [ ] **Review 타입 확장** (`src/shared/types/review.ts`)
  - `country` 필드 추가 → ReviewItem에 국가 표시
  - `sentimentTag` 필드 추가

- [ ] **목 데이터 제거** — 실 API 연동 후 각 컴포넌트에서 props로 받도록 변경
  - `AISummaryBlock`, `AIActionItemList`, `AIPainPointClusters`, `AICSAutoReply`, `AIPredictionPanel`, `StatsRow`, `ReviewList`

---

## 추후 검토 항목 (스토어 확장)

- [ ] App Store 크롤링 추가 (`app-store-scraper` 패키지)
  - [ ] `GET /api/crawling/app-store` 라우트 구현 (앱 ID 숫자 형태, e.g. `553834731`)
  - [ ] 타입 정의 추가 (`src/shared/types/review.ts`)
  - [ ] StoreSelector `App Store` 칩 활성화
- [ ] Galaxy Store 크롤링 추가
  - [ ] `GET /api/crawling/galaxy-store` 라우트 구현
  - [ ] StoreSelector `Galaxy Store` 칩 활성화
- [ ] 멀티 스토어 비교 분석 (Gemini에 복수 스토어 데이터 전달)

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
