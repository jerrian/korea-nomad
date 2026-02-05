import { expect, type Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { TEST_IDS } from '../../config/test-ids';
import { URLS, TIMEOUTS } from '../../test-data/constants';

/**
 * Cities List Page Object
 *
 * 도시 목록 페이지 (/cities)
 */
export class CitiesListPage extends BasePage {
  readonly path = URLS.CITIES;

  // Component Locators
  readonly searchBar: Locator;
  readonly searchInput: Locator;
  readonly filterPanel: Locator;
  readonly cityGrid: Locator;
  readonly sortDropdown: Locator;
  readonly noResults: Locator;

  constructor(page: any) {
    super(page);
    this.searchBar = page.getByTestId(TEST_IDS.SEARCH_BAR);
    this.searchInput = page.getByTestId(TEST_IDS.SEARCH_INPUT);
    this.filterPanel = page.getByTestId(TEST_IDS.FILTER_PANEL);
    this.cityGrid = page.getByTestId(TEST_IDS.CITY_GRID);
    this.sortDropdown = page.getByTestId(TEST_IDS.SORT_DROPDOWN);
    this.noResults = page.getByTestId(TEST_IDS.NO_RESULTS);
  }

  // Actions
  async searchCities(query: string): Promise<void> {
    await this.searchInput.fill(query);
    // 디바운스 대기
    await this.page.waitForTimeout(TIMEOUTS.DEBOUNCE);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
    await this.page.waitForTimeout(TIMEOUTS.DEBOUNCE);
  }

  async applyFilter(region: string): Promise<void> {
    const filterButton = this.page.getByTestId(TEST_IDS.FILTER_REGION(region));
    await filterButton.click();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.click();
    await this.page.getByText(option).click();
  }

  async clickCityCard(slug: string): Promise<void> {
    const cityCard = this.page.getByTestId(TEST_IDS.CITY_CARD(slug));
    await cityCard.click();
  }

  // Assertions
  async expectCityCount(count: number): Promise<void> {
    const cityCards = this.page.locator('[data-testid^="city-card-"]');
    await expect(cityCards).toHaveCount(count);
  }

  async expectNoResultsMessage(): Promise<void> {
    await expect(this.noResults).toBeVisible();
  }

  async expectSearchBarVisible(): Promise<void> {
    await expect(this.searchBar).toBeVisible();
  }

  async expectFilterPanelVisible(): Promise<void> {
    await expect(this.filterPanel).toBeVisible();
  }

  async expectCityGridVisible(): Promise<void> {
    await expect(this.cityGrid).toBeVisible();
  }

  async expectFilterApplied(filterName: string): Promise<void> {
    // 필터가 활성화된 상태를 확인
    const filterButton = this.page.getByTestId(TEST_IDS.FILTER_REGION(filterName));
    await expect(filterButton).toHaveAttribute('aria-pressed', 'true');
  }

  async expectCityVisible(slug: string): Promise<void> {
    const cityCard = this.page.getByTestId(TEST_IDS.CITY_CARD(slug));
    await expect(cityCard).toBeVisible();
  }

  async expectCityNotVisible(slug: string): Promise<void> {
    const cityCard = this.page.getByTestId(TEST_IDS.CITY_CARD(slug));
    await expect(cityCard).not.toBeVisible();
  }
}
