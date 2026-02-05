/**
 * 중앙화된 data-testid 상수
 *
 * 실제 컴포넌트에 data-testid를 추가할 때 이 값들을 사용합니다.
 */

export const TEST_IDS = {
  // Layout
  HEADER: 'header',
  FOOTER: 'footer',
  MOBILE_MENU: 'mobile-menu',
  MOBILE_MENU_BUTTON: 'mobile-menu-button',

  // Navigation
  LOGO: 'logo',
  NAV_CITIES: 'nav-cities',
  NAV_COMMUNITY: 'nav-community',
  NAV_ABOUT: 'nav-about',

  // Auth
  LOGIN_BUTTON: 'login-button',
  SIGNUP_BUTTON: 'signup-button',
  USER_MENU: 'user-menu',
  USER_MENU_BUTTON: 'user-menu-button',
  LOGOUT_BUTTON: 'logout-button',

  // Auth Modals
  LOGIN_MODAL: 'login-modal',
  SIGNUP_MODAL: 'signup-modal',
  AUTH_EMAIL_INPUT: 'auth-email-input',
  AUTH_PASSWORD_INPUT: 'auth-password-input',
  AUTH_NAME_INPUT: 'auth-name-input',
  AUTH_CONFIRM_PASSWORD_INPUT: 'auth-confirm-password-input',
  AUTH_SUBMIT_BUTTON: 'auth-submit-button',
  AUTH_SWITCH_LINK: 'auth-switch-link',
  AUTH_ERROR_MESSAGE: 'auth-error-message',

  // Home Page
  HERO_SECTION: 'hero-section',
  HERO_SEARCH: 'hero-search',
  HERO_CTA_BUTTON: 'hero-cta-button',
  FEATURED_CITIES: 'featured-cities',
  HOW_IT_WORKS: 'how-it-works',
  STATISTICS: 'statistics',
  TESTIMONIALS: 'testimonials',
  FEATURES: 'features',
  CTA_SECTION: 'cta-section',

  // City Cards
  CITY_CARD: (slug: string) => `city-card-${slug}`,
  CITY_CARD_IMAGE: (slug: string) => `city-card-image-${slug}`,
  CITY_CARD_NAME: (slug: string) => `city-card-name-${slug}`,
  CITY_CARD_RATING: (slug: string) => `city-card-rating-${slug}`,
  CITY_CARD_LIKE: (slug: string) => `city-card-like-${slug}`,
  CITY_CARD_DISLIKE: (slug: string) => `city-card-dislike-${slug}`,

  // Cities List Page
  SEARCH_BAR: 'search-bar',
  SEARCH_INPUT: 'search-input',
  FILTER_PANEL: 'filter-panel',
  FILTER_REGION: (region: string) => `filter-region-${region}`,
  CITY_GRID: 'city-grid',
  SORT_DROPDOWN: 'sort-dropdown',
  NO_RESULTS: 'no-results',

  // City Detail Page
  CITY_HERO: 'city-hero',
  CITY_INFO: 'city-info',
  CITY_REVIEWS: 'city-reviews',
  CITY_REVIEW_ITEM: (index: number) => `city-review-${index}`,
  RELATED_CITIES: 'related-cities',
  RELATED_CITY: (slug: string) => `related-city-${slug}`,

  // Common
  LOADING: 'loading',
  ERROR: 'error',
} as const;
