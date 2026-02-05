import { expect, type Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { TEST_IDS } from '../../config/test-ids';
import { URLS } from '../../test-data/constants';

/**
 * City Detail Page Object
 *
 * 도시 상세 페이지 (/cities/[slug])
 */
export class CityDetailPage extends BasePage {
  readonly citySlug: string;
  readonly path: string;

  // Section Locators
  readonly cityHero: Locator;
  readonly cityInfo: Locator;
  readonly cityReviews: Locator;
  readonly relatedCities: Locator;

  constructor(page: any, citySlug: string) {
    super(page);
    this.citySlug = citySlug;
    this.path = URLS.CITY_DETAIL(citySlug);

    this.cityHero = page.getByTestId(TEST_IDS.CITY_HERO);
    this.cityInfo = page.getByTestId(TEST_IDS.CITY_INFO);
    this.cityReviews = page.getByTestId(TEST_IDS.CITY_REVIEWS);
    this.relatedCities = page.getByTestId(TEST_IDS.RELATED_CITIES);
  }

  // Actions
  async likeCity(): Promise<void> {
    const likeButton = this.page.getByTestId(TEST_IDS.CITY_CARD_LIKE(this.citySlug));
    await likeButton.click();
  }

  async dislikeCity(): Promise<void> {
    const dislikeButton = this.page.getByTestId(TEST_IDS.CITY_CARD_DISLIKE(this.citySlug));
    await dislikeButton.click();
  }

  async clickRelatedCity(slug: string): Promise<void> {
    const relatedCity = this.page.getByTestId(TEST_IDS.RELATED_CITY(slug));
    await relatedCity.click();
  }

  async scrollToReviews(): Promise<void> {
    await this.scrollToElement(this.cityReviews);
  }

  async scrollToRelatedCities(): Promise<void> {
    await this.scrollToElement(this.relatedCities);
  }

  // Assertions
  async expectCityName(name: string | RegExp): Promise<void> {
    await expect(this.cityHero).toContainText(name);
  }

  async expectCityHeroVisible(): Promise<void> {
    await expect(this.cityHero).toBeVisible();
  }

  async expectCityInfoVisible(): Promise<void> {
    await expect(this.cityInfo).toBeVisible();
  }

  async expectCityReviewsVisible(): Promise<void> {
    await expect(this.cityReviews).toBeVisible();
  }

  async expectRelatedCitiesVisible(): Promise<void> {
    await expect(this.relatedCities).toBeVisible();
  }

  async expectReviewCount(count: number): Promise<void> {
    const reviews = this.page.locator('[data-testid^="city-review-"]');
    await expect(reviews).toHaveCount(count);
  }

  async expectRelatedCitiesCount(count: number): Promise<void> {
    const relatedCities = this.page.locator('[data-testid^="related-city-"]');
    await expect(relatedCities).toHaveCount(count);
  }

  async expectReviewContent(index: number, content: string | RegExp): Promise<void> {
    const review = this.page.getByTestId(TEST_IDS.CITY_REVIEW_ITEM(index));
    await expect(review).toContainText(content);
  }
}
