## 프로젝트 개요

구글 플레이 스토어의 실제 리뷰 데이터를 실시간으로 크롤링하여, AI(Gemini)가 유저의 페인 포인트를 분석하고 기획/운영팀이 즉시 실행할 수 있는 '액션 아이템'을 제안하는 통합 대시보드 프로젝트

## 프로젝트 목표

- 정성 데이터의 정량화: 텍스트 형태의 유저 리뷰를 감성 점수 및 카테고리별 지표로 변환하여 시각화함.

- 업무 자동화: 수동으로 진행하던 글로벌 리뷰 수집 및 요약 과정을 AI 에이전트로 자동화하여 대응 속도 극대화.

- 실행 가능한 인사이트 제공: 단순 분석에 그치지 않고, 데이터에 기반한 구체적인 업데이트 우선순위 제안.

## 디렉토리 구조 및 아키텍쳐 환경

```
src/
├── app/                  # 앱의 진입점 (Next.js App Router, 글로벌 스타일, Provider)
├── pages/                # 실제 페이지 구성 (DashboardPage, SettingPage 등)
├── widgets/              # 여러 기능(Features)이 조합된 복합 컴포넌트
├── features/             # 유저 비즈니스 가치를 만드는 핵심 기능 단위
├── shared/               # 공통 컴포넌트 및 유틸리티
└── app/api/              # Next.js API Routes (Backend-like)
    ├── crawling/         # google-play-scraper 로직
    └── analyze/          # Gemini API 연동 로직
```

- 상태관리 도구로 zustand 사용
- FSD 구조 세팅
- Nextjs 사용 및 vercel 을 이용한 간단배포

## 작업 규칙

### 토큰 절약 규칙

1. 이미 읽은 파일은 읽지 않는다.
2. 하나의 파일에 모든 것을 다 넣지 말고 모듈화한다.
3. 사용자가 이미 설명한 내용을 반복하지 않는다.
4. 많은 부분을 수정해야 한다면, 다시 물어보고 진행한다.
5. 요청이 명확하지 않을 때 추론 및 실행하지 말고 우선 설명을 제대로 이해했는지 말한다.

### 코딩 계획 규칙

1. 진행하는 phase의 계획을 todo.md 에서 확인하고 todo list 순서대로 진행한다.
2. todo.md 의 작업 내용이 명확하지 않은 경우, 설명을 제대로 이해했는지 말한다.
3. 작업이 변경된 경우, todo.md 도 함께 수정한다.

## 코딩 표준

### 변수명

- 콜백 파라미터는 축약하지 않고 의미있는 이름을 사용한다
  - `(r) => r.data` ❌ → `(response) => response.data` ✅
  - `arr.map((i) => i.name)` ❌ → `arr.map((item) => item.name)` ✅
  - `arr.filter((m) => m.active)` ❌ → `arr.filter((membership) => membership.active)` ✅
- 단, 관용적으로 허용되는 단일 문자 (`e` for event, `_` for ignored) 는 예외

### 제어 흐름

- if 문은 항상 중괄호를 사용한다 (한 줄이어도 예외 없음)
  - `if (a) return b` ❌
  - `if (a) { return b }` ✅
- 삼항 연산자는 허용하지만, 중첩은 금지

## 스킬 목록

- pull-request
- design-prototype
