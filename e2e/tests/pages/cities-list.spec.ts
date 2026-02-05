import { test, expect } from '../../fixtures/base';
import { TOTAL_CITIES_COUNT, TEST_CITIES } from '../../test-data/cities.data';

test.describe('Cities List Page', () => {
  test.beforeEach(async ({ citiesListPage }) => {
    await citiesListPage.goto(citiesListPage.path);
  });

  test('displays all cities by default', async ({ citiesListPage }) => {
    await citiesListPage.expectCityCount(TOTAL_CITIES_COUNT);
  });

  test('displays search bar and filter panel', async ({ citiesListPage }) => {
    await citiesListPage.expectSearchBarVisible();
    await citiesListPage.expectFilterPanelVisible();
    await citiesListPage.expectCityGridVisible();
  });

  test('search filters cities', async ({ citiesListPage }) => {
    await citiesListPage.searchCities('서울');
    await citiesListPage.expectCityVisible(TEST_CITIES.seoul.slug);
    // 다른 도시들은 보이지 않아야 함
    await citiesListPage.expectCityNotVisible(TEST_CITIES.busan.slug);
  });

  test('clear search shows all cities again', async ({ citiesListPage }) => {
    await citiesListPage.searchCities('서울');
    await citiesListPage.clearSearch();
    await citiesListPage.expectCityCount(TOTAL_CITIES_COUNT);
  });

  test('clicking a city card navigates to city detail page', async ({ citiesListPage, page }) => {
    await citiesListPage.clickCityCard(TEST_CITIES.seoul.slug);
    await expect(page).toHaveURL(/\/cities\/seoul/);
  });

  test('header is visible', async ({ citiesListPage }) => {
    await citiesListPage.header.expectVisible();
  });
});
