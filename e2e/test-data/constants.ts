/**
 * 테스트용 상수
 */

export const TIMEOUTS = {
  DEBOUNCE: 350, // 검색 디바운스 (300ms + 여유)
  ANIMATION: 500, // 애니메이션 대기
  API: 5000, // API 응답 대기
  PAGE_LOAD: 10000, // 페이지 로딩
} as const;

export const URLS = {
  HOME: '/',
  CITIES: '/cities',
  CITY_DETAIL: (slug: string) => `/cities/${slug}`,
} as const;

export const REGIONS = [
  '서울',
  '경기도',
  '강원도',
  '충청도',
  '전라도',
  '경상도',
  '제주도',
] as const;

export const SORT_OPTIONS = {
  RECOMMENDED: '추천순',
  RATING: '평점순',
  COST: '비용순',
  NOMADS: '노마드순',
} as const;

export const LOCAL_STORAGE_KEYS = {
  USERS: 'koreanomad_users',
  CURRENT_USER: 'koreanomad_current_user',
} as const;
