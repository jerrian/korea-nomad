import type { City, CityDetail, CityReview } from '@/types';

export const mockCity: City = {
  id: 'test-city',
  name: '테스트 도시',
  region: '테스트 지역',
  image: '/test-image.jpg',
  rating: 4.5,
  monthlyCost: 1000000,
  internetSpeed: 100,
  nomadCount: 50,
  weather: {
    temp: 20,
    condition: 'sunny',
  },
  airQuality: 30,
  badge: 'HOT',
  tags: ['카페', '바다'],
  likeCount: 10,
  dislikeCount: 2,
};

export const mockCityDetail: CityDetail = {
  id: 'test-city',
  description: '테스트 도시 설명',
  highlights: ['하이라이트 1', '하이라이트 2'],
  coworkingSpaces: 5,
  cafesCount: 20,
  averageRent: 500000,
  transportScore: 4,
  safetyScore: 5,
};

export const mockCityReview: CityReview = {
  id: 'test-review',
  cityId: 'test-city',
  rating: 5,
  content: '테스트 리뷰 내용',
  author: '테스트 작성자',
  job: '개발자',
  stayDuration: '1개월',
  createdAt: '2024-01-01',
  pros: ['장점 1', '장점 2'],
  cons: ['단점 1'],
};

export const mockCities: City[] = [
  mockCity,
  { ...mockCity, id: 'city-2', name: '도시 2', badge: undefined },
  { ...mockCity, id: 'city-3', name: '도시 3', badge: 'POPULAR' },
];
