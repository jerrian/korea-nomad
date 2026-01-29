# KoreaNomad MVP 개발 계획

> **목표**: 데이터베이스 없이 가짜 데이터로 컨셉을 검증하는 MVP 구현
> **원칙**: 각 Phase는 자체적으로 실행 가능한 형태로 완성되어야 함

---

## 현재 상태 분석

### Phase 0: 기본 구현 ✅ 완료

홈페이지의 모든 기본 섹션 구현 완료

- [x] Header (네비게이션, 모바일 메뉴)
- [x] HeroSection (검색바 UI, CTA, 통계 배지)
- [x] FeaturedCities (8개 도시 카드)
- [x] HowItWorks (3단계 설명)
- [x] Statistics (6개 통계 + 카운트업 애니메이션)
- [x] Testimonials (4개 후기 + 캐러셀)
- [x] Features (6개 기능 카드 + 호버 효과)
- [x] CTASection (이메일 폼 UI + 신뢰 배지)
- [x] Footer (4열 메뉴, 소셜 링크)
- [x] 목업 데이터 (`src/data/cities.ts`)
- [x] 타입 정의 (`src/types/index.ts`)

---

## Phase 1: 기본 인터랙션 완성 ✅ 완료

### 목표
홈페이지의 기본 인터랙션을 완성하여 사용자 경험 향상

### 작업 내용

#### 1.1 스크롤 애니메이션
- [x] 각 섹션 진입 시 Fade-in 애니메이션 (Framer Motion)
- [x] 도시 카드 순차적 등장 애니메이션 (stagger)

#### 1.2 Hero 섹션 개선
- [x] CTA 버튼 클릭 시 FeaturedCities로 스크롤
- [x] 검색바 포커스 시 스타일 변화

#### 1.3 CTA 섹션 폼 검증
- [x] 이메일 유효성 검사 (클라이언트 사이드)
- [x] 성공/에러 메시지 표시

### 변경된 파일
- `src/components/ui/motion.tsx` (신규 - 재사용 애니메이션 컴포넌트)
- `src/components/home/HeroSection.tsx`
- `src/components/home/FeaturedCities.tsx`
- `src/components/home/HowItWorks.tsx`
- `src/components/home/Features.tsx`
- `src/components/home/Testimonials.tsx`
- `src/components/home/CTASection.tsx`

### 완료 기준
- [x] `npm run dev` 실행 시 모든 애니메이션 정상 작동
- [x] CTA 버튼 → FeaturedCities 스크롤 동작
- [x] 이메일 폼 검증 동작
- [x] `npm run build` 성공

---

## Phase 2: 도시 목록 페이지 ✅ 완료

### 목표
`/cities` 페이지를 구현하여 모든 도시를 탐색할 수 있는 기능 제공

### 작업 내용

#### 2.1 도시 목록 페이지 기본
- [x] `/cities` 페이지 생성
- [x] 도시 카드 그리드 (16개)
- [x] 반응형 레이아웃 (4열 → 3열 → 2열 → 1열)

#### 2.2 검색 기능
- [x] 검색바 컴포넌트
- [x] 도시명/지역/태그 검색 (클라이언트 필터링)
- [x] 검색 디바운싱 (300ms)

#### 2.3 필터 기능
- [x] 필터 UI (생활비, 인터넷 속도, 지역)
- [x] 선택된 필터 칩 표시
- [x] 필터 초기화 버튼

#### 2.4 정렬 기능
- [x] 정렬 드롭다운 (평점순, 생활비순, 인터넷순, 노마드 수)

#### 2.5 데이터 확장
- [x] `cities.ts`에 16개 도시 데이터 추가

### 생성/변경된 파일
- `src/app/cities/page.tsx` (신규)
- `src/components/cities/CityGrid.tsx` (신규)
- `src/components/cities/SearchBar.tsx` (신규)
- `src/components/cities/FilterPanel.tsx` (신규)
- `src/hooks/useDebounce.ts` (신규)
- `src/data/cities.ts` (수정 - allCities, regions 추가)

### 완료 기준
- [x] `/cities` 접근 시 도시 목록 표시
- [x] 검색 입력 시 실시간 필터링
- [x] 필터 적용 시 목록 업데이트
- [x] Header "도시 찾기" 링크 연결
- [x] `npm run build` 성공

---

## Phase 3: 도시 상세 페이지 ✅ 완료

### 목표
개별 도시의 상세 정보를 보여주는 페이지 구현

### 작업 내용

#### 3.1 도시 상세 페이지 레이아웃
- [x] `/cities/[slug]` 동적 라우트 생성
- [x] 히어로 섹션 (도시 이미지 + 기본 정보)
- [x] 뒤로가기 버튼

#### 3.2 도시 정보 섹션
- [x] 기본 정보 카드 (생활비, 인터넷, 날씨, 대기질)
- [x] 추가 정보 카드 (코워킹, 카페, 교통, 안전)
- [x] 도시 소개 텍스트
- [x] 주요 특징 (highlights)
- [x] 태그 표시

#### 3.3 리뷰 섹션
- [x] 리뷰 목록 (도시별 3개 리뷰)
- [x] 별점 표시 및 평균 평점
- [x] 장점/단점 배지

#### 3.4 추천 도시
- [x] "비슷한 도시" 카드 섹션 (4개)
- [x] 같은 지역/태그 기반 추천 알고리즘

#### 3.5 데이터 확장
- [x] 도시별 상세 정보 데이터 추가 (16개 도시)
- [x] 도시별 리뷰 데이터 추가 (48개 리뷰)

### 생성/변경된 파일
- `src/app/cities/[slug]/page.tsx` (신규)
- `src/components/city/CityHero.tsx` (신규)
- `src/components/city/CityInfo.tsx` (신규)
- `src/components/city/CityReviews.tsx` (신규)
- `src/components/city/RelatedCities.tsx` (신규)
- `src/data/cityDetails.ts` (신규)
- `src/types/index.ts` (수정 - CityDetail, CityReview 타입 추가)

### 완료 기준
- [x] 도시 카드 클릭 시 상세 페이지 이동
- [x] 상세 정보 및 리뷰 정상 표시
- [x] 추천 도시 카드 클릭 시 해당 페이지 이동
- [x] 반응형 레이아웃 적용
- [x] `npm run build` 성공

---

## Phase 4: 마무리 및 최적화 ✅ 완료

### 목표
MVP 완성도를 높이고 배포 가능한 상태로 마무리

### 작업 내용

#### 4.1 SEO 기본 설정
- [x] 페이지별 title, description 메타 태그
- [x] Open Graph 태그 (공유 시 미리보기)
- [x] Twitter 카드 설정
- [x] robots 메타 태그
- [x] viewport 설정
- [x] favicon 설정 (기존 존재)

#### 4.2 네비게이션 연결
- [x] 모든 Header 링크 연결 확인 (미구현은 # 처리)
- [x] Footer 링크 정리 (미구현 페이지는 # 처리)
- [x] 404 페이지 생성

#### 4.3 빌드 및 테스트
- [x] `npm run build` 성공
- [x] `npm run lint` 에러 없음
- [x] TypeScript 에러 없음

#### 4.4 코드 정리
- [x] 미사용 import 제거
- [x] TypeScript 에러 해결

### 생성/변경된 파일
- `src/app/layout.tsx` (메타데이터 강화)
- `src/app/not-found.tsx` (신규 - 404 페이지)
- `src/app/cities/layout.tsx` (신규 - 도시 섹션 레이아웃)
- `src/app/cities/[slug]/page.tsx` (중복 Header/Footer 제거)
- `src/data/cities.ts` (navItems 링크 정리)
- `src/components/layout/Footer.tsx` (법적 링크 # 처리)

### 완료 기준
- [x] `npm run build` 에러 없이 성공
- [x] 모든 페이지 정상 접근 가능
- [x] 기본 SEO 메타 태그 설정 완료
- [x] 404 페이지 정상 표시

---

## Phase 요약

| Phase | 목표 | 주요 산출물 | 상태 |
|-------|------|-------------|------|
| Phase 0 | 기본 구현 | 홈페이지 전체 | ✅ 완료 |
| Phase 1 | 기본 인터랙션 | 애니메이션, 폼 검증 | ✅ 완료 |
| Phase 2 | 도시 목록 | `/cities` 페이지 | ✅ 완료 |
| Phase 3 | 도시 상세 | `/cities/[slug]` 페이지 | ✅ 완료 |
| Phase 4 | 마무리 | SEO, 빌드, 테스트 | ✅ 완료 |

---

## MVP 이후 고려사항 (향후)

다음 항목들은 MVP 범위에서 제외하며, 추후 필요시 구현:

- 다크 모드
- 로그인/회원가입 페이지
- 블로그 페이지
- 인터랙티브 한국 지도
- 실제 API 연동 (날씨, 대기질)
- 토스트 알림 시스템
- 스켈레톤 로딩 UI
- 고급 애니메이션 (타이핑 효과, 패럴랙스)

---

## 기술 스택

```json
{
  "framework": "Next.js 16.1.3 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS 4",
  "ui": "shadcn/ui (Radix UI)",
  "animation": "Framer Motion",
  "icons": "Lucide React",
  "carousel": "Embla Carousel"
}
```

---

## 실행 명령어

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm run start

# 린트
npm run lint
```
