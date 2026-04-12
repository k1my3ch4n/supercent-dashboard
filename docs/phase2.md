# Phase 2: 크롤링 API

구글 플레이 스토어의 앱 리뷰를 수집하는 API입니다.

---

## 1. 조회 방식 및 파라미터

### Endpoint

```
GET /api/crawling
```

`google-play-scraper` 라이브러리를 사용해 구글 플레이 스토어에서 리뷰를 실시간으로 크롤링합니다.
외부 DB 없이 요청 시점에 직접 수집합니다.

### Query Parameters

| 파라미터 | 타입   | 필수 여부 | 기본값 | 설명                           |
| -------- | ------ | --------- | ------ | ------------------------------ |
| `appId`  | string | **필수**  | -      | 구글 플레이 스토어 앱 ID       |
| `lang`   | string | 선택      | `en`   | 리뷰 언어 코드 (ISO 639-1)     |
| `num`    | number | 선택      | `100`  | 수집할 리뷰 수 (1 ~ 5000 정수) |

**앱 ID 확인 방법**

구글 플레이 스토어 앱 페이지 URL에서 `id=` 뒤의 값을 사용합니다.

```
https://play.google.com/store/apps/details?id=io.supercent.pizzaidle
                                                ^^^^^^^^^^^^^^^^^^^^^^
                                                이 값이 appId
```

**lang 파라미터 예시**

| 코드 | 언어   |
| ---- | ------ |
| `ko` | 한국어 |
| `en` | 영어   |
| `ja` | 일본어 |
| `zh` | 중국어 |

> 한 번의 요청에 하나의 언어만 지정할 수 있습니다. 여러 언어의 리뷰가 필요하다면 언어별로 별도 요청해야 합니다.

**요청 예시**

```
# 한국어 리뷰 100개 수집 (기본값)
GET /api/crawling?appId=io.supercent.pizzaidle&lang=ko

# 영어 리뷰 50개 수집
GET /api/crawling?appId=io.supercent.pizzaidle&lang=en&num=50
```

---

## 2. 응답 타입

### Review (개별 리뷰)

```typescript
interface Review {
  id: string; // 리뷰 고유 ID
  userName: string; // 작성자 이름
  score: number; // 별점 (1 ~ 5)
  text: string; // 리뷰 본문
  date: string; // 작성일 (ISO 8601 형식, e.g. "2026-04-10T21:21:56.258Z")
}
```

### 성공 응답

```typescript
interface CrawlingSuccessResponse {
  reviews: Review[]; // 수집된 리뷰 배열
  total: number; // 실제 수집된 리뷰 수
  appId: string; // 요청한 앱 ID
  lang: string; // 요청한 언어 코드
}
```

### 실패 응답

```typescript
interface CrawlingErrorResponse {
  error: string; // 에러 메시지
}
```

---

## 3. 성공 / 실패 예시

### 성공 (200)

**요청**

```
GET /api/crawling?appId=io.supercent.pizzaidle&lang=ko&num=2
```

**응답**

```json
{
  "reviews": [
    {
      "id": "3cc5123c-6f32-47fb-9418-235e25db25d7",
      "userName": "Jason B",
      "score": 1,
      "text": "게임을 하려 광고보는게 아니라 광고를 보기위해 게임하는거 같음.",
      "date": "2026-04-10T21:21:56.258Z"
    },
    {
      "id": "692af7b4-a246-47aa-882e-7862419ceaa7",
      "userName": "최정우",
      "score": 1,
      "text": "광고 제거팩을 거금주고 삿는데도 광고를 계속 봐야하네요...쓰레기",
      "date": "2026-04-09T14:04:18.485Z"
    }
  ],
  "total": 2,
  "appId": "io.supercent.pizzaidle",
  "lang": "ko"
}
```

---

### 실패: appId 누락 (400)

**요청**

```
GET /api/crawling
```

**응답**

```json
{
  "error": "appId is required"
}
```

---

### 실패: num 범위 초과 (400)

**요청**

```
GET /api/crawling?appId=io.supercent.pizzaidle&num=9999
```

**응답**

```json
{
  "error": "num must be an integer between 1 and 5000"
}
```

---

### 실패: 존재하지 않는 앱 ID (404)

**요청**

```
GET /api/crawling?appId=com.invalid.app.id
```

**응답**

```json
{
  "error": "App 'com.invalid.app.id' not found"
}
```

---

### 실패: 네트워크 등 서버 오류 (500)

**응답**

```json
{
  "error": "Failed to fetch reviews"
}
```

---

## 관련 파일

| 파일                                                              | 설명              |
| ----------------------------------------------------------------- | ----------------- |
| [src/app/api/crawling/route.ts](../src/app/api/crawling/route.ts) | API 라우트 핸들러 |
| [src/shared/types/review.ts](../src/shared/types/review.ts)       | 응답 타입 정의    |
