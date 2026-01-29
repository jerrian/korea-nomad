# CLAUDE.md - KoreaNomad 프로젝트 가이드

## 프로젝트 개요

KoreaNomad는 한국의 디지털 노마드들이 최적의 도시를 찾고 커뮤니티와 소통할 수 있는 원스톱 플랫폼입니다. 16개 도시 정보, 48개의 사용자 리뷰, 실시간 날씨/대기질 데이터를 제공합니다.

## 기술 스택

- **Framework**: Next.js 16.1.3 (App Router)
- **Runtime**: React 19.2.3
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 (OKLCH 색상 시스템)
- **UI Components**: shadcn/ui (Radix UI 기반, new-york 스타일)
- **Animation**: Framer Motion 12.27.5, tw-animate-css 1.4.0
- **Icons**: Lucide React 0.562.0
- **Carousel**: Embla Carousel 8.6.0

## 프로젝트 구조

```
./
├── CLAUDE.md                   # 프로젝트 가이드 (이 파일)
├── .claude/
│   └── commands/               # Claude Code 커스텀 커맨드
│       ├── decompose.md
│       ├── create-issue.md
│       └── solve-issue.md
├── docs/                       # 기획 및 계획 문서
│   ├── PRD.md
│   ├── IMPROVEMENT_PLAN.md
│   └── execution_plans/
├── wt-claude.sh                # 워크트리 + Claude Code 실행 스크립트
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 홈페이지
│   │   ├── not-found.tsx       # 404 페이지
│   │   ├── globals.css         # 전역 스타일 (OKLCH 테마)
│   │   └── cities/
│   │       ├── layout.tsx      # 도시 페이지 레이아웃
│   │       ├── page.tsx        # 도시 목록 페이지
│   │       └── [slug]/page.tsx # 도시 상세 페이지
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 재사용 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── carousel.tsx
│   │   │   └── motion.tsx      # Framer Motion 래퍼 (FadeIn, StaggerContainer, StaggerItem)
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── home/               # 홈페이지 섹션 컴포넌트
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedCities.tsx
│   │   │   ├── CityCard.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Statistics.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Features.tsx
│   │   │   └── CTASection.tsx
│   │   ├── cities/             # 도시 목록 컴포넌트
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── CityGrid.tsx
│   │   └── city/               # 도시 상세 컴포넌트
│   │       ├── CityHero.tsx
│   │       ├── CityInfo.tsx
│   │       ├── CityReviews.tsx
│   │       └── RelatedCities.tsx
│   ├── hooks/
│   │   └── useDebounce.ts      # 디바운스 훅
│   ├── lib/
│   │   └── utils.ts            # cn() 유틸리티 함수
│   ├── types/
│   │   └── index.ts            # TypeScript 타입 정의
│   └── data/
│       ├── cities.ts           # 도시 목록 정적 데이터
│       └── cityDetails.ts      # 도시 상세 및 리뷰 데이터
├── public/                     # 정적 파일
├── package.json
├── tsconfig.json
├── next.config.ts              # Next.js 설정 (이미지 도메인)
├── components.json             # shadcn/ui 설정
├── eslint.config.mjs           # ESLint 설정
└── postcss.config.mjs
```

## 라우트 구조

| 경로 | 설명 | 주요 기능 |
|------|------|----------|
| `/` | 홈페이지 | 히어로, 추천 도시, 통계, 후기 |
| `/cities` | 도시 목록 | 검색, 필터, 정렬, 그리드 뷰 |
| `/cities/[slug]` | 도시 상세 | 도시 정보, 리뷰, 관련 도시 |
| 404 | Not Found | 커스텀 404 페이지 |

## 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# ESLint 실행
npm run lint
```

## 코딩 컨벤션

### TypeScript
- strict 모드 사용
- 모든 컴포넌트 props에 타입 정의 필수
- `@/*` 경로 별칭 사용 (예: `@/components/ui/button`)

### 컴포넌트
- 함수형 컴포넌트 사용 (export default function)
- 파일명은 PascalCase (예: `HeroSection.tsx`)
- UI 컴포넌트는 `src/components/ui/`에 위치

### 스타일링
- Tailwind CSS 4 클래스 사용
- OKLCH 색상 시스템 (CSS 변수로 정의)
- Light/Dark 테마 지원
- `cn()` 유틸리티로 조건부 클래스 조합
- 반응형 디자인: `sm:`, `md:`, `lg:`, `xl:` 접두사 사용

### 타입 정의 (`src/types/index.ts`)

| 타입 | 설명 |
|------|------|
| `City` | 도시 기본 정보 (id, name, region, rating, monthlyCost 등) |
| `CityDetail` | 도시 상세 정보 (description, highlights, coworkingSpaces 등) |
| `CityReview` | 도시 리뷰 (rating, content, author, pros, cons 등) |
| `BadgeType` | 도시 배지 타입 ('HOT' \| 'POPULAR' \| 'TRENDING' \| 'NEW') |
| `WeatherData` | 날씨 정보 (temp, condition) |
| `Testimonial` | 사용자 후기 타입 |
| `Feature` | 기능 소개 타입 |
| `Statistic` | 통계 데이터 타입 |
| `NavItem` | 네비게이션 링크 타입 |
| `FooterSection` | 푸터 섹션 타입 |

## 데이터 구조

### `src/data/cities.ts`
```typescript
export const allCities: City[]           // 전체 도시 목록 (16개)
export const featuredCities: City[]      // 추천 도시 (8개)
export const regions: string[]           // 지역 목록
export const testimonials: Testimonial[] // 사용자 후기
export const features: Feature[]         // 기능 소개
export const statistics: Statistic[]     // 통계 데이터
export const navItems: NavItem[]         // 네비게이션 메뉴
export const footerSections: FooterSection[] // 푸터 섹션
```

### `src/data/cityDetails.ts`
```typescript
export const cityDetails: Record<string, CityDetail> // 도시별 상세 정보
export const cityReviews: Record<string, CityReview[]> // 도시별 리뷰 (도시당 3개)
export function getCityDetail(cityId: string): CityDetail | undefined
export function getCityReviews(cityId: string): CityReview[]
export function getRelatedCities(cityId: string, count?: number): string[]
```

## 커스텀 훅

### useDebounce
```typescript
import { useDebounce } from '@/hooks/useDebounce';

// 사용 예시
const debouncedSearch = useDebounce(searchTerm, 300);
```

## 모션 컴포넌트 (`src/components/ui/motion.tsx`)

### FadeIn
뷰포트 진입 시 페이드인 애니메이션
```tsx
<FadeIn delay={0.2} direction="up">
  {children}
</FadeIn>
```

### StaggerContainer / StaggerItem
자식 요소들의 순차적 애니메이션
```tsx
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem direction="up">{item1}</StaggerItem>
  <StaggerItem direction="up">{item2}</StaggerItem>
</StaggerContainer>
```

## 설정 파일

### next.config.ts
- Unsplash 이미지 도메인 허용 (`images.unsplash.com`)

### components.json (shadcn/ui)
- 스타일: `new-york`
- 아이콘: `lucide`
- 경로 별칭: `@/components`, `@/lib/utils`, `@/hooks`

## SEO/메타데이터

각 페이지에서 Next.js 메타데이터 API 사용:
```typescript
// 정적 메타데이터
export const metadata: Metadata = { ... }

// 동적 메타데이터
export async function generateMetadata({ params }): Promise<Metadata>

// 정적 경로 생성
export async function generateStaticParams()
```

## 도시 목록 페이지 기능

- **검색**: 도시명, 지역명 검색 (디바운싱 적용)
- **필터**: 지역별 필터링
- **정렬**: 추천순, 평점순, 비용순, 노마드순

## 홈페이지 섹션 구조 (PRD 기준)

1. **Header** - 고정 네비게이션 (로고, 메뉴, 검색, 로그인)
2. **HeroSection** - 메인 배너 (검색바, CTA, 통계 배지)
3. **FeaturedCities** - 인기 도시 8개 카드 그리드
4. **HowItWorks** - 3단계 사용 방법 (탐색 → 비교 → 떠나기)
5. **Statistics** - 6개 통계 카드 (카운트업 애니메이션)
6. **Testimonials** - 사용자 후기 캐러셀
7. **Features** - 6개 주요 기능 소개
8. **CTASection** - 이메일 가입 폼
9. **Footer** - 4열 메뉴, 소셜 링크, 법적 고지

## 성능 요구사항

- Lighthouse Performance: 90점 이상
- First Contentful Paint (FCP): 1.8초 이하
- Largest Contentful Paint (LCP): 2.5초 이하
- Cumulative Layout Shift (CLS): 0.1 이하

## 반응형 브레이크포인트

- 모바일: < 768px (1열 레이아웃)
- 태블릿: 768px - 1024px (2열 레이아웃)
- 데스크톱: > 1024px (4열 레이아웃)

## 외부 API

### 현재 사용 중
- **이미지**: Unsplash API (도시 이미지)

### 향후 연동 예정
- **날씨**: OpenWeatherMap API
- **대기질**: AirKorea API
- **지도**: Kakao Maps API
- **이메일**: SendGrid 또는 Resend

## 주의사항

- 이미지는 Next.js Image 컴포넌트 사용 (lazy loading, WebP 포맷)
- 검색 기능에 디바운싱 적용 (300ms)
- 모든 외부 링크는 `target="_blank" rel="noopener noreferrer"` 사용
- 접근성 고려 (WCAG 2.1 준수)

## 참고 문서

- PRD: `docs/PRD.md`
- 개발 계획: `docs/IMPROVEMENT_PLAN.md`
- 실행 계획: `docs/execution_plans/`
- Next.js 문서: https://nextjs.org/docs
- Tailwind CSS 문서: https://tailwindcss.com/docs
- shadcn/ui 문서: https://ui.shadcn.com
