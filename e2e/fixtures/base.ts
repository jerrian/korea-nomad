import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/pages/home.page';
import { CitiesListPage } from '../page-objects/pages/cities-list.page';
import { CityDetailPage } from '../page-objects/pages/city-detail.page';

/**
 * Base Fixtures
 *
 * 모든 테스트에서 사용 가능한 기본 픽스처
 */

type PageObjects = {
  homePage: HomePage;
  citiesListPage: CitiesListPage;
  cityDetailPage: (slug: string) => CityDetailPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  citiesListPage: async ({ page }, use) => {
    const citiesListPage = new CitiesListPage(page);
    await use(citiesListPage);
  },

  cityDetailPage: async ({ page }, use) => {
    const createCityDetailPage = (slug: string) => new CityDetailPage(page, slug);
    await use(createCityDetailPage);
  },
});

export { expect } from '@playwright/test';
