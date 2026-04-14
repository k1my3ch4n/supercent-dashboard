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
- [x] `StoreBadge` — 스토어별 아이콘 뱃지 (Google Play · App Store, SVG 컴포넌트)
- [x] `LoadingSpinner` — AI 분석 실행 중 표시
- [x] `ErrorMessage` — API 오류 표시
- [x] `ProgressBar` — AI 임팩트 바, 카테고리 비중 바 공용
- [x] `PriorityTag` — HIGH · MED · LOW 우선순위 태그

---

### 5-2. 게임 선택 화면 (`src/features/game/ui`)

- [x] `GameCard` — 게임 썸네일(그라디언트+이모지) + 이름 + StoreBadge 목록
  - props: `game`, `onSelect` (클릭 핸들러 부모 바인딩)
  - 클릭 시 대시보드로 이동
- [x] `GameCardAdd` — 사용하지 않아 제거
- [x] `GameGrid` — 반응형 그리드 (모바일 1열 · 태블릿 2열 · 데스크탑 3열)

---

### 5-3. 레이아웃 (`src/shared/ui/layout`)

- [x] `Sidebar` — 로고 · 게임 스위처(클릭 시 선택 화면 복귀) · 네비게이션 · 푸터
- [x] `Topbar` — 뒤로가기 · 게임명 · 기간 탭(7D/30D/90D) · AI 분석 실행 버튼
- [x] `StoreSelector` — Google Play · App Store 칩 (SOON 상태 지원)

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

## Phase 5-CSS: Tailwind 토큰 통합 (var() → className 변환)

> globals.css 에 정의된 @theme 토큰을 모든 컴포넌트에서 inline style이 아닌 className으로 활용

### 작업 범위

- ✅ 총 22개 파일 변환 완료
- ✅ inline style에서 color/background/borderColor를 className으로 이동
- ✅ config objects 내 색상 참조를 color 토큰 className으로 변환
- ✅ 이벤트 핸들러의 직접 style 조작 → state + className 기반 리팩토링

### 작업 파일 목록

#### Shared UI (11개)

- [x] `shared/ui/Card.tsx` — bg-color-card, border-border-color ✅
- [x] `shared/ui/Badge.tsx` — config 색상 → className 분리 ✅
- [x] `shared/ui/PriorityTag.tsx` — config 색상 → className 분리 ✅
- [x] `shared/ui/ErrorMessage.tsx` — inline style 제거 ✅
- [x] `shared/ui/LoadingSpinner.tsx` — spinner 색상, text 색상 ✅
- [x] `shared/ui/ProgressBar.tsx` — color prop → className ✅
- [x] `shared/ui/StoreBadge.tsx` — inline color/borderColor ✅
- [x] `shared/ui/layout/Sidebar.tsx` — 여러 inline style + 이벤트 핸들러 ✅
- [x] `shared/ui/layout/Topbar.tsx` — 여러 inline style + 이벤트 핸들러 ✅
- [x] `shared/ui/layout/StoreSelector.tsx` — style + 이벤트 핸들러 ✅

#### Features (11개)

- [x] `features/review/ui/ReviewItem.tsx` — color 객체 + inline style ✅
- [x] `features/review/ui/ReviewList.tsx` — inline style ✅
- [x] `features/game/ui/GameCard.tsx` — config 객체 style ✅
- [x] `features/game/ui/GameCardAdd.tsx` — 사용하지 않아 제거 ✅
- [x] `features/analysis/ui/AIActionItemList.tsx` — config 색상 + 이벤트 핸들러 ✅
- [x] `features/analysis/ui/AIPainPointClusters.tsx` — inline style + 이벤트 핸들러 ✅
- [x] `features/analysis/ui/AIPredictionPanel.tsx` — config 색상 + inline style ✅
- [x] `features/analysis/ui/AICSAutoReply.tsx` — 여러 style + 이벤트 핸들러 ✅
- [x] `features/analysis/ui/AISummaryBlock.tsx` — config colorVar + inline style ✅
- [x] `features/analysis/ui/StatCard.tsx` — 삼항 연산자 color + inline style ✅
- [x] `features/analysis/ui/StatsRow.tsx` — valueColor prop ✅

#### Widgets (1개)

- [x] `widgets/GameSelectWidget.tsx` — 이벤트 핸들러 리팩토링 ✅

---

## Phase 5-Refactor: Widgets 비즈니스 로직 → Features 분리

> widgets 레이어에 혼재된 비즈니스 로직을 FSD 원칙에 따라 features로 이동

- [x] `features/game/model/useGame.ts` 생성
  - `gameId`로 게임 객체를 조회하는 hook
  - `DashboardWidget`의 `MOCK_GAMES.find(...)` + 폴백 로직 이동
- [x] `features/analysis/model/useRunAnalysis.ts` 생성
  - AI 분석 실행 + `isAnalyzing` 상태를 캡슐화하는 hook
  - `DashboardWidget`의 `handleRunAI` + `isAnalyzing` 상태 이동
  - `useAnalysisStore`의 `isLoading` 을 `isAnalyzing`으로 노출
- [x] `features/game/model/useGameActions.ts` 생성
  - 게임 추가 액션을 캡슐화하는 hook
  - `GameSelectWidget`의 `handleAddClick` 로직 이동
- [x] `DashboardWidget.tsx` 리팩토링
  - `useGame`, `useRunAnalysis` hook으로 교체
  - 불필요한 import 제거
- [x] `GameSelectWidget.tsx` 리팩토링
  - `useGameActions` hook으로 교체

---

## Phase 6: 페이지 라우팅 구성

> 단일 페이지 `useState` 전환 방식 → Next.js App Router 동적 라우트로 전환

- [x] `src/app/page.tsx` — useState 제거, `GameSelectWidget`만 렌더링
- [x] `src/app/detail/[id]/page.tsx` — 동적 라우트 생성, `DashboardWidget` 렌더링
- [x] `GameSelectWidget` — `onGameSelect` 콜백 제거, `router.push('/detail/:id')` 적용
- [x] `DashboardWidget` — `Topbar` 네비게이션 콜백(`onGoMain`, `onSelectGame`) 전달 및 라우팅 내부화
- [x] `Sidebar` — `onGameChange` prop 제거 및 `router.push('/')` 내부화 (현재 대시보드 UI에서는 제거됨)
- [x] `Topbar` — 로고 클릭 메인 이동 + 게임 아이콘 클릭 상세 이동 (`router.push`) 구조로 전환
- [x] `Topbar` 기간 탭(7D/30D/90D) 제거 및 날짜 필터 스토어 분리 (`storeFilterStore`)
- [ ] `SettingPage` 구현 (`src/pages/setting`) — 추후
  - [ ] 게임 목록 관리 (추가 · 삭제 · 앱 ID 설정)
  - [ ] 크롤링 설정 (언어, 리뷰 수, 스케줄)

---

## 실 데이터 연동 완료 항목

- [x] **게임 목록 스토어 구현** (`src/features/game/model/gameStore.ts`)
  - `GAMES` + Zustand `useGameStore` 기반으로 교체 완료
  - `Game` 타입에 `appId` 필드 추가 (각 게임별 Google Play 패키지명)
  - `mockGames.ts` → `games.ts` 파일명 정리 완료
  - ⚠️ `games.ts`의 각 `appId` 값을 실제 Google Play 패키지명으로 교체 필요
  - 게임 추가/삭제 UI 제거 (내부 툴이므로 코드 직접 수정)

- [x] **스토어 정책 정리**
  - Galaxy Store 지원 제거 (타입/필터/셀렉터/아이콘 반영)
  - 현재 지원 스토어: Google Play, App Store

- [x] **AnalysisResult 타입 확장** (`src/shared/types/analysis.ts`)
  - `insights: string[]` — Gemini 종합 인사이트 5개
  - `clusters: ClusterItem[]` — 페인 포인트 클러스터 (name, count, quote, keywords)
  - `positivePercent: number` — 긍정 리뷰 비율
  - `ActionItem` 확장: `reviewCount`, `targetSegment`, `timeline`, `impactLabel`, `impactPercent`, `confidence`
  - `prediction`, `anomalies`, `csReplies` 필드 확장
  - Gemini 프롬프트 및 검증 로직 함께 수정 완료

- [x] **Review 타입 확장** (`src/shared/types/review.ts`)
  - `country?: string` 추가 (크롤링 시 `lang` 값으로 설정)
  - `sentimentTag?: string` 추가 (선택적 필드)

- [x] **목 데이터 제거 — 실 API 연동 완료**
  - `AISummaryBlock` ✅ — `useAnalysisStore` 연결, healthScore/alertsCount 클라이언트 계산
  - `AIActionItemList` ✅ — `useAnalysisStore` 연결
  - `AIPainPointClusters` ✅ — `useAnalysisStore` 연결
  - `ReviewList` ✅ — `useReviewStore` 연결, 대시보드 진입 시 자동 fetch

- [x] **E2E 플로우 연결**
  - 대시보드 진입 시 `game.appId`로 리뷰 자동 fetch (`useEffect`)
  - "AI 분석 실행" 클릭 시 리뷰 재fetch → Gemini 분석 순차 실행 (`useRunAnalysis`)

## 추후 검토 항목 (미결)

- [x] **AICSAutoReply 실 데이터 연동**
  - 데이터 출처: analyze API `csReplies`
  - `ReplyCard`를 독립 컴포넌트로 분리 완료 (`src/features/analysis/ui/ReplyCard.tsx`)

- [x] **AIPredictionPanel 실 데이터 연동**
  - 데이터 출처: analyze API `prediction`, `anomalies`

- [x] **StatsRow 실 데이터 연동 (1차)**
  - 1차 우선순위: **크롤링 데이터 기반 연동 완료**
    - `Collected Reviews` = `reviews.length`

---

## UI 조정 (2026-04-14)

- [x] 분석 API 파싱 안정화 (`src/app/api/analyze/route.ts`)
  - 엄격 fail-fast 검증을 완화하고 필드 단위 fallback 정규화 적용
  - 부분 실패 시에도 기본값으로 결과를 구성하고 warnings를 반환하도록 개선

- [x] 대시보드 사이드바 제거 (`src/widgets/DashboardWidget.tsx`)
- [x] 헤더를 메인 로고 중심으로 단순화하고, 로고 클릭 시 메인(`/`) 이동 연결 (`src/shared/ui/layout/Topbar.tsx`)
- [x] `StoreSelector` + `AI 분석 실행` 버튼을 헤더 우측으로 이동 (`src/shared/ui/layout/Topbar.tsx`)
- [x] 헤더에 전체 게임 아이콘 퀵 네비게이션 추가 (`src/shared/ui/layout/Topbar.tsx`)
  - 현재 게임 포함 전체 아이콘 노출
  - 아이콘 클릭 시 해당 상세(`/detail/[id]`)로 즉시 이동
  - 현재 게임 아이콘 강조(핑크 테두리 + 링 + 글로우 + scale)

- [x] `DashboardWidget` 헤더 연동 정리 (`src/widgets/DashboardWidget.tsx`)
  - `games`, `currentGameId`, `onGoMain`, `onSelectGame` 전달
  - 본문 상단의 중복 `StoreSelector` 제거

- [x] 통계 카드 실데이터 반영/안정화 (`src/features/analysis/ui/StatsRow.tsx`)
  - `Avg Rating` = `reviews.score` 평균
  - `Response Queue` = 저평점(1~2점) 건수 + 비율(%) — Low Rating Rate + Needs Reply 통합
  - `Recent 7D Reviews` = 수집 리뷰 중 최신 시점 기준 7일 이내 건수
  - 지표 안정화: 크롤링 샘플 기준 문구로 통일, `AI Predicted` 카드는 StatsRow에서 제거

- [x] **StatCard UI 레이아웃 개선**
  - 기준 라벨(`최근 리뷰 기준` / `14일 후 예측`)을 카드 우상단으로 이동
  - 아이콘 `sr-only` 처리
  - 숫자 + description을 `mt-auto`로 묶어 카드 하단에 고정 → 카드 간 높이 일치
  - `gap-size-6`으로 숫자와 설명 밀착

- [x] AI 분석 섹션 카드 높이 통일 (`src/features/analysis/ui/*`)
  - 대상: `AIActionItemList`, `AIPainPointClusters`, `AICSAutoReply`, `AIPredictionPanel`
  - 카드 외곽 높이 고정(`h-[460px]`) 및 본문 영역 내부 스크롤 처리(`overflow-y-auto`)

- [x] AI 분석 4개 카드 균등 배치 (`src/widgets/DashboardWidget.tsx`)
  - 액션 아이템 ~ 예측 패널을 단일 2x2 그리드로 통일 (`grid-cols-1 md:grid-cols-2`)
  - 카드 간 간격/정렬 규칙을 동일하게 유지

- [x] 카드 내부 아이템 컴포넌트 분리 (`src/features/analysis/ui/ActionItemCard.tsx`, `src/features/analysis/ui/ClusterCard.tsx`)
  - `ActionItemCard`, `ClusterCard`를 리스트 컴포넌트에서 분리하여 모듈화
  - `AnalysisPanelCard` 제거 후 각 패널에서 직접 레이아웃/상태 렌더링

- [x] `Card` 공용 헤더 props 도입 (`src/shared/ui/Card.tsx`)
  - `title`, `subtitle`, `badgeVariant` 기반으로 헤더를 Card 내부에서 렌더링
  - 분석 패널 4개의 중복 헤더 마크업 제거

- [x] 분석 패널 4종 더보기/접기 UX 통일 (`src/features/analysis/ui/*`)
  - 대상: `AIActionItemList`, `AIPainPointClusters`, `AICSAutoReply`, `AIPredictionPanel`
  - 하단 footer 토글(`더보기`/`접기`) + 토글 시 해당 카드 상단으로 스크롤 이동
  - 접힌 상태에서 실제 overflow가 있을 때만 토글 노출되도록 조건 개선

- [x] 분석 카드 레이아웃 안정화 (`src/features/analysis/ui/ActionItemCard.tsx`, `src/features/analysis/ui/ReplyCard.tsx`, `src/widgets/DashboardWidget.tsx`)
  - 내부 카드 `overflow-hidden` 제거로 내용 클리핑 완화
  - 분석 2x2 그리드에 `items-start` 적용으로 카드별 확장 높이 충돌 방지

- [x] 시멘틱 HTML 태그 전면 적용 (`src/**/*.tsx`)
  - 리스트 렌더링 영역을 `ul/li` 구조로 통일 (`GameGrid`, `ReviewList`, 분석 카드 목록들)
  - 독립 콘텐츠 카드에 `article/header/footer` 적용 (`GameCard`, `ActionItemCard`, `ClusterCard`, `ReplyCard`, `StatCard`)
  - 페이지/구획 의미 강화 (`Topbar`의 `header/nav`, 요약/통계/패널 `section` 구조)
  - 접근성 시멘틱 보강 (`time`, `role="alert"`, `role="status"`, `role="progressbar"`)

---

## 추후 검토 항목 (스토어 확장)

- [ ] App Store 크롤링 추가 (`app-store-scraper` 패키지)
  - [ ] `GET /api/crawling/app-store` 라우트 구현 (앱 ID 숫자 형태, e.g. `553834731`)
  - [ ] 타입 정의 추가 (`src/shared/types/review.ts`)
  - [ ] StoreSelector `App Store` 칩 활성화
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
