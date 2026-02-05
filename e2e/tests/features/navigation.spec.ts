import { test, expect } from '../../fixtures/base';

test.describe('Navigation', () => {
  test('logo navigates to home page', async ({ page, homePage }) => {
    await homePage.goto('/cities');
    await homePage.header.clickLogo();
    await expect(page).toHaveURL('/');
  });

  test('cities link navigates to cities page', async ({ page, homePage }) => {
    await homePage.goto('/');
    await homePage.header.clickCitiesLink();
    await expect(page).toHaveURL('/cities');
  });

  test('browser back button works correctly', async ({ homePage, citiesListPage, page }) => {
    // Home -> Cities
    await homePage.goto('/');
    await homePage.header.clickCitiesLink();
    await expect(page).toHaveURL('/cities');

    // Back to Home
    await citiesListPage.goBack();
    await expect(page).toHaveURL('/');
  });

  test('navigating between city detail pages', async ({ citiesListPage, cityDetailPage, page }) => {
    // Cities List -> Seoul Detail
    await citiesListPage.goto('/cities');
    await citiesListPage.clickCityCard('seoul');
    await expect(page).toHaveURL('/cities/seoul');

    // Seoul -> Related City
    const seoulPage = cityDetailPage('seoul');
    await seoulPage.scrollToRelatedCities();
    await seoulPage.clickRelatedCity('incheon');
    await expect(page).toHaveURL('/cities/incheon');
  });
});
