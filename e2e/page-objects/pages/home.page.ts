import { expect, type Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { TEST_IDS } from '../../config/test-ids';
import { URLS } from '../../test-data/constants';

/**
 * Home Page Object
 *
 * 홈페이지 (/)
 */
export class HomePage extends BasePage {
  readonly path = URLS.HOME;

  // Section Locators
  readonly heroSection: Locator;
  readonly heroSearch: Locator;
  readonly heroCTAButton: Locator;
  readonly featuredCities: Locator;
  readonly howItWorks: Locator;
  readonly statistics: Locator;
  readonly testimonials: Locator;
  readonly features: Locator;
  readonly ctaSection: Locator;

  constructor(page: any) {
    super(page);
    this.heroSection = page.getByTestId(TEST_IDS.HERO_SECTION);
    this.heroSearch = page.getByTestId(TEST_IDS.HERO_SEARCH);
    this.heroCTAButton = page.getByTestId(TEST_IDS.HERO_CTA_BUTTON);
    this.featuredCities = page.getByTestId(TEST_IDS.FEATURED_CITIES);
    this.howItWorks = page.getByTestId(TEST_IDS.HOW_IT_WORKS);
    this.statistics = page.getByTestId(TEST_IDS.STATISTICS);
    this.testimonials = page.getByTestId(TEST_IDS.TESTIMONIALS);
    this.features = page.getByTestId(TEST_IDS.FEATURES);
    this.ctaSection = page.getByTestId(TEST_IDS.CTA_SECTION);
  }

  // Actions
  async searchCity(query: string): Promise<void> {
    await this.heroSearch.fill(query);
    await this.heroSearch.press('Enter');
  }

  async clickCTA(): Promise<void> {
    await this.heroCTAButton.click();
  }

  async scrollToFeaturedCities(): Promise<void> {
    await this.scrollToElement(this.featuredCities);
  }

  async clickCityCard(slug: string): Promise<void> {
    const cityCard = this.page.getByTestId(TEST_IDS.CITY_CARD(slug));
    await cityCard.click();
  }

  // Assertions
  async expectHeroVisible(): Promise<void> {
    await expect(this.heroSection).toBeVisible();
  }

  async expectFeaturedCitiesVisible(): Promise<void> {
    await expect(this.featuredCities).toBeVisible();
  }

  async expectFeaturedCitiesCount(count: number): Promise<void> {
    // FeaturedCities 섹션 내부에서 /cities/ 링크만 카운트
    const cityCards = this.featuredCities.locator('a[href^="/cities/"]');
    await expect(cityCards).toHaveCount(count);
  }

  async expectCityCardVisible(slug: string): Promise<void> {
    const cityCard = this.page.getByTestId(TEST_IDS.CITY_CARD(slug));
    await expect(cityCard).toBeVisible();
  }

  async expectHowItWorksVisible(): Promise<void> {
    await expect(this.howItWorks).toBeVisible();
  }

  async expectStatisticsVisible(): Promise<void> {
    await expect(this.statistics).toBeVisible();
  }

  async expectTestimonialsVisible(): Promise<void> {
    await expect(this.testimonials).toBeVisible();
  }

  async expectFeaturesVisible(): Promise<void> {
    await expect(this.features).toBeVisible();
  }

  async expectCTASectionVisible(): Promise<void> {
    await expect(this.ctaSection).toBeVisible();
  }
}
