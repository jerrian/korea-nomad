import { test, expect } from '../../fixtures/base';
import { FEATURED_CITIES_COUNT } from '../../test-data/cities.data';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto(homePage.path);
  });

  test('displays hero section', async ({ homePage }) => {
    await homePage.expectHeroVisible();
  });

  test('displays featured cities section', async ({ homePage }) => {
    await homePage.expectFeaturedCitiesVisible();
    await homePage.expectFeaturedCitiesCount(FEATURED_CITIES_COUNT);
  });

  test('displays all main sections', async ({ homePage }) => {
    await homePage.expectHeroVisible();
    await homePage.expectFeaturedCitiesVisible();

    await homePage.scrollToElement(homePage.howItWorks);
    await homePage.expectHowItWorksVisible();

    await homePage.scrollToElement(homePage.statistics);
    await homePage.expectStatisticsVisible();

    await homePage.scrollToElement(homePage.testimonials);
    await homePage.expectTestimonialsVisible();

    await homePage.scrollToElement(homePage.features);
    await homePage.expectFeaturesVisible();

    await homePage.scrollToElement(homePage.ctaSection);
    await homePage.expectCTASectionVisible();
  });

  test('header and footer are visible', async ({ homePage }) => {
    await homePage.header.expectVisible();
    await homePage.footer.expectVisible();
  });

  test('logo is visible in header', async ({ homePage }) => {
    await homePage.header.expectLogoVisible();
  });

  test('city cards are visible in featured cities section', async ({ homePage }) => {
    // 제주 도시 카드가 보이는지 확인
    await homePage.expectCityCardVisible('jeju');

    // 부산 해운대 도시 카드가 보이는지 확인
    await homePage.expectCityCardVisible('busan-haeundae');

    // 강릉 도시 카드가 보이는지 확인
    await homePage.expectCityCardVisible('gangneung');
  });

  test('clicking a city card navigates to city detail page', async ({ homePage, page }) => {
    await homePage.clickCityCard('jeju');
    await expect(page).toHaveURL(/\/cities\/jeju/);
  });
});
