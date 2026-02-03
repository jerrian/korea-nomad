export type BadgeType = 'HOT' | 'POPULAR' | 'TRENDING' | 'NEW';

export interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
}

export interface City {
  id: string;
  name: string;
  region: string;
  image: string;
  rating: number;
  monthlyCost: number;
  internetSpeed: number;
  nomadCount: number;
  weather: WeatherData;
  airQuality: number;
  badge?: BadgeType;
  tags: string[];
  likeCount: number;
  dislikeCount: number;
}

export interface Testimonial {
  id: string;
  rating: number;
  content: string;
  author: string;
  job: string;
  location: string;
  avatar?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Statistic {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
  subLabel?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export interface CityDetail {
  id: string;
  description: string;
  highlights: string[];
  coworkingSpaces: number;
  cafesCount: number;
  averageRent: number;
  transportScore: number;
  safetyScore: number;
}

export interface CityReview {
  id: string;
  cityId: string;
  rating: number;
  content: string;
  author: string;
  job: string;
  stayDuration: string;
  createdAt: string;
  pros: string[];
  cons: string[];
}

// Auth 관련 타입
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
