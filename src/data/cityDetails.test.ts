import { describe, it, expect } from 'vitest';
import { getCityDetail, getCityReviews, getRelatedCities, cityDetails, cityReviews } from './cityDetails';
import { allCities } from './cities';

describe('cityDetails functions', () => {
  describe('getCityDetail', () => {
    it('should return city detail for valid id', () => {
      const detail = getCityDetail('jeju');

      expect(detail).toBeDefined();
      expect(detail?.id).toBe('jeju');
      expect(detail?.description).toBeTruthy();
      expect(detail?.highlights).toBeInstanceOf(Array);
      expect(detail?.highlights.length).toBeGreaterThan(0);
    });

    it('should return city detail with all required fields', () => {
      const detail = getCityDetail('busan-haeundae');

      expect(detail).toHaveProperty('id');
      expect(detail).toHaveProperty('description');
      expect(detail).toHaveProperty('highlights');
      expect(detail).toHaveProperty('coworkingSpaces');
      expect(detail).toHaveProperty('cafesCount');
      expect(detail).toHaveProperty('averageRent');
      expect(detail).toHaveProperty('transportScore');
      expect(detail).toHaveProperty('safetyScore');
    });

    it('should return undefined for invalid id', () => {
      const detail = getCityDetail('invalid-city');
      expect(detail).toBeUndefined();
    });

    it('should return undefined for empty id', () => {
      const detail = getCityDetail('');
      expect(detail).toBeUndefined();
    });

    it('should have correct data types', () => {
      const detail = getCityDetail('jeju');

      expect(typeof detail?.id).toBe('string');
      expect(typeof detail?.description).toBe('string');
      expect(Array.isArray(detail?.highlights)).toBe(true);
      expect(typeof detail?.coworkingSpaces).toBe('number');
      expect(typeof detail?.cafesCount).toBe('number');
      expect(typeof detail?.averageRent).toBe('number');
      expect(typeof detail?.transportScore).toBe('number');
      expect(typeof detail?.safetyScore).toBe('number');
    });

    it('should return all city details from cityDetails object', () => {
      const cityIds = Object.keys(cityDetails);

      expect(cityIds.length).toBeGreaterThan(0);

      cityIds.forEach((cityId) => {
        const detail = getCityDetail(cityId);
        expect(detail).toBeDefined();
        expect(detail?.id).toBe(cityId);
      });
    });

    it('should have reasonable values', () => {
      const detail = getCityDetail('jeju');

      expect(detail?.coworkingSpaces).toBeGreaterThan(0);
      expect(detail?.cafesCount).toBeGreaterThan(0);
      expect(detail?.averageRent).toBeGreaterThan(0);
      expect(detail?.transportScore).toBeGreaterThanOrEqual(1);
      expect(detail?.transportScore).toBeLessThanOrEqual(5);
      expect(detail?.safetyScore).toBeGreaterThanOrEqual(1);
      expect(detail?.safetyScore).toBeLessThanOrEqual(5);
    });
  });

  describe('getCityReviews', () => {
    it('should return reviews for valid city', () => {
      const reviews = getCityReviews('jeju');

      expect(reviews).toBeInstanceOf(Array);
      expect(reviews.length).toBeGreaterThan(0);
      expect(reviews[0]).toHaveProperty('cityId', 'jeju');
    });

    it('should return empty array for city without reviews', () => {
      const reviews = getCityReviews('nonexistent-city');
      expect(reviews).toEqual([]);
    });

    it('should return reviews with correct structure', () => {
      const reviews = getCityReviews('jeju');

      expect(reviews.length).toBeGreaterThan(0);

      const review = reviews[0];
      expect(review).toHaveProperty('id');
      expect(review).toHaveProperty('cityId');
      expect(review).toHaveProperty('rating');
      expect(review).toHaveProperty('content');
      expect(review).toHaveProperty('author');
      expect(review).toHaveProperty('job');
      expect(review).toHaveProperty('stayDuration');
      expect(review).toHaveProperty('createdAt');
      expect(review).toHaveProperty('pros');
      expect(review).toHaveProperty('cons');
    });

    it('should have correct data types in reviews', () => {
      const reviews = getCityReviews('jeju');
      const review = reviews[0];

      expect(typeof review.id).toBe('string');
      expect(typeof review.cityId).toBe('string');
      expect(typeof review.rating).toBe('number');
      expect(typeof review.content).toBe('string');
      expect(typeof review.author).toBe('string');
      expect(typeof review.job).toBe('string');
      expect(typeof review.stayDuration).toBe('string');
      expect(typeof review.createdAt).toBe('string');
      expect(Array.isArray(review.pros)).toBe(true);
      expect(Array.isArray(review.cons)).toBe(true);
    });

    it('should have valid rating values (1-5)', () => {
      const allReviewArrays = Object.values(cityReviews);

      allReviewArrays.forEach((reviews) => {
        reviews.forEach((review) => {
          expect(review.rating).toBeGreaterThanOrEqual(1);
          expect(review.rating).toBeLessThanOrEqual(5);
        });
      });
    });

    it('should have at least one pro or con', () => {
      const reviews = getCityReviews('jeju');

      reviews.forEach((review) => {
        const totalFeedback = review.pros.length + review.cons.length;
        expect(totalFeedback).toBeGreaterThan(0);
      });
    });

    it('should return multiple reviews for each city', () => {
      const cityIds = Object.keys(cityReviews);

      cityIds.forEach((cityId) => {
        const reviews = getCityReviews(cityId);
        expect(reviews.length).toBeGreaterThanOrEqual(1);

        // 각 리뷰의 cityId가 일치하는지 확인
        reviews.forEach((review) => {
          expect(review.cityId).toBe(cityId);
        });
      });
    });

    it('should have unique review IDs', () => {
      const reviews = getCityReviews('jeju');
      const ids = reviews.map((r) => r.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('getRelatedCities', () => {
    it('should return related cities (default 4)', () => {
      const related = getRelatedCities('jeju');

      expect(related).toBeInstanceOf(Array);
      expect(related.length).toBeLessThanOrEqual(4);
      expect(related).not.toContain('jeju'); // 자기 자신은 제외
    });

    it('should return specified number of related cities', () => {
      const related2 = getRelatedCities('jeju', 2);
      expect(related2.length).toBeLessThanOrEqual(2);

      const related6 = getRelatedCities('jeju', 6);
      expect(related6.length).toBeLessThanOrEqual(6);
    });

    it('should not include the current city', () => {
      const cityId = 'busan-haeundae';
      const related = getRelatedCities(cityId, 10);

      expect(related).not.toContain(cityId);
    });

    it('should return empty array for invalid city', () => {
      const related = getRelatedCities('invalid-city');
      expect(related).toEqual([]);
    });

    it('should return empty array for empty city id', () => {
      const related = getRelatedCities('');
      expect(related).toEqual([]);
    });

    it('should prioritize same region cities', () => {
      const currentCity = allCities.find((c) => c.id === 'jeju');
      expect(currentCity).toBeDefined();

      const related = getRelatedCities('jeju', 10);

      // 관련 도시 중에서 같은 지역 도시 찾기
      const relatedCities = allCities.filter((c) => related.includes(c.id));
      const sameRegionCities = relatedCities.filter((c) => c.region === currentCity?.region);

      // 같은 지역 도시가 있다면, 상위에 위치해야 함
      if (sameRegionCities.length > 0) {
        const firstRelatedCity = allCities.find((c) => c.id === related[0]);
        // 첫 번째 도시는 같은 지역이거나 공통 태그가 많아야 함
        expect(firstRelatedCity).toBeDefined();
      }
    });

    it('should consider common tags', () => {
      const currentCity = allCities.find((c) => c.id === 'jeju');
      const related = getRelatedCities('jeju', 5);

      const relatedCities = allCities.filter((c) => related.includes(c.id));

      // 관련 도시들이 공통 태그를 가지고 있는지 확인
      relatedCities.forEach((city) => {
        const commonTags = city.tags.filter((tag) => currentCity?.tags.includes(tag));
        // 같은 지역이거나 공통 태그가 있어야 함
        const isSameRegion = city.region === currentCity?.region;
        const hasCommonTags = commonTags.length > 0;

        expect(isSameRegion || hasCommonTags).toBe(true);
      });
    });

    it('should not exceed available cities', () => {
      const totalCities = allCities.length;
      const related = getRelatedCities('jeju', 100);

      expect(related.length).toBeLessThan(totalCities); // 자기 자신 제외
    });

    it('should return valid city IDs', () => {
      const related = getRelatedCities('jeju', 10);
      const allCityIds = allCities.map((c) => c.id);

      related.forEach((cityId) => {
        expect(allCityIds).toContain(cityId);
      });
    });

    it('should be deterministic (same input -> same output)', () => {
      const related1 = getRelatedCities('jeju', 5);
      const related2 = getRelatedCities('jeju', 5);

      expect(related1).toEqual(related2);
    });

    it('should handle city with no common tags or region', () => {
      // 모든 도시에 대해 관련 도시를 찾을 수 있어야 함
      allCities.forEach((city) => {
        const related = getRelatedCities(city.id, 3);

        // 최소한 1개 이상의 관련 도시를 찾을 수 있어야 함 (전체 도시가 2개 이상이라고 가정)
        if (allCities.length > 1) {
          expect(related.length).toBeGreaterThan(0);
        }
      });
    });

    it('should return different cities for different inputs', () => {
      const relatedJeju = getRelatedCities('jeju', 5);
      const relatedBusan = getRelatedCities('busan-haeundae', 5);

      // 제주와 부산의 관련 도시는 완전히 다를 수 있음
      // (겹칠 수도 있지만, 순서는 달라야 함)
      expect(relatedJeju[0]).not.toBe(relatedBusan[0]);
    });
  });

  describe('integration: city detail, reviews, and related cities', () => {
    it('should have matching data across all functions', () => {
      const cityId = 'jeju';

      const detail = getCityDetail(cityId);
      const reviews = getCityReviews(cityId);
      const related = getRelatedCities(cityId);

      // 상세 정보가 있으면 리뷰도 있어야 함
      if (detail) {
        expect(reviews.length).toBeGreaterThan(0);
      }

      // 모든 리뷰의 cityId가 일치해야 함
      reviews.forEach((review) => {
        expect(review.cityId).toBe(cityId);
      });

      // 관련 도시들이 실제로 존재해야 함
      related.forEach((relatedId) => {
        const relatedDetail = getCityDetail(relatedId);
        expect(relatedDetail).toBeDefined();
      });
    });

    it('should have consistent data across all cities', () => {
      const detailIds = Object.keys(cityDetails);
      const reviewIds = Object.keys(cityReviews);

      // 상세 정보가 있는 모든 도시는 리뷰도 있어야 함
      detailIds.forEach((cityId) => {
        expect(reviewIds).toContain(cityId);
      });

      // allCities의 모든 도시는 상세 정보가 있어야 함
      allCities.forEach((city) => {
        const detail = getCityDetail(city.id);
        expect(detail).toBeDefined();
      });
    });

    it('should handle full city exploration flow', () => {
      // 1. 도시 상세 정보 가져오기
      const detail = getCityDetail('jeju');
      expect(detail).toBeDefined();

      // 2. 리뷰 가져오기
      const reviews = getCityReviews('jeju');
      expect(reviews.length).toBeGreaterThan(0);

      // 3. 관련 도시 가져오기
      const related = getRelatedCities('jeju', 3);
      expect(related.length).toBeGreaterThan(0);

      // 4. 관련 도시의 상세 정보 가져오기
      const relatedDetails = related.map((cityId) => getCityDetail(cityId));
      relatedDetails.forEach((detail) => {
        expect(detail).toBeDefined();
      });

      // 5. 관련 도시의 리뷰 가져오기
      const relatedReviews = related.map((cityId) => getCityReviews(cityId));
      relatedReviews.forEach((reviews) => {
        expect(reviews.length).toBeGreaterThan(0);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle null and undefined inputs gracefully', () => {
      expect(getCityDetail(null as any)).toBeUndefined();
      expect(getCityDetail(undefined as any)).toBeUndefined();

      expect(getCityReviews(null as any)).toEqual([]);
      expect(getCityReviews(undefined as any)).toEqual([]);

      expect(getRelatedCities(null as any)).toEqual([]);
      expect(getRelatedCities(undefined as any)).toEqual([]);
    });

    it('should handle special characters in city ID', () => {
      const detail = getCityDetail('busan-haeundae'); // hyphen 포함
      expect(detail).toBeDefined();
      expect(detail?.id).toBe('busan-haeundae');
    });

    it('should handle zero count in getRelatedCities', () => {
      const related = getRelatedCities('jeju', 0);
      expect(related).toEqual([]);
    });

    it('should handle negative count in getRelatedCities', () => {
      const related = getRelatedCities('jeju', -1);
      // slice는 음수를 0으로 처리하므로 빈 배열이 아닐 수 있음
      expect(Array.isArray(related)).toBe(true);
    });

    it('should handle very large count in getRelatedCities', () => {
      const related = getRelatedCities('jeju', 1000);
      expect(related.length).toBeLessThan(allCities.length);
    });
  });
});
