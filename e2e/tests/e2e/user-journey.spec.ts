import { test, expect } from '../../fixtures/base';
import { TEST_CITIES } from '../../test-data/cities.data';

test.describe('User Journey', () => {
  test('complete user journey: discover city and view details', async ({
    homePage,
    citiesListPage,
    cityDetailPage,
    page,
  }) => {
    // 1. 홈페이지에 방문
    await homePage.goto('/');
    await homePage.expectHeroVisible();

    // 2. Featured Cities 섹션으로 스크롤
    await homePage.scrollToFeaturedCities();
    await homePage.expectFeaturedCitiesVisible();

    // 3. 도시 카드 클릭
    await homePage.clickCityCard(TEST_CITIES.seoul.slug);

    // 4. 도시 상세 페이지 확인
    await expect(page).toHaveURL(/\/cities\/seoul/);
    const seoulPage = cityDetailPage(TEST_CITIES.seoul.slug);
    await seoulPage.expectCityHeroVisible();
    await seoulPage.expectCityName(TEST_CITIES.seoul.name);

    // 5. 리뷰 섹션으로 스크롤
    await seoulPage.scrollToReviews();
    await seoulPage.expectCityReviewsVisible();

    // 6. 관련 도시로 이동
    await seoulPage.scrollToRelatedCities();
    await seoulPage.expectRelatedCitiesVisible();
    await seoulPage.clickRelatedCity(TEST_CITIES.incheon.slug);

    // 7. 새로운 도시 페이지 확인
    await expect(page).toHaveURL(/\/cities\/incheon/);
    const incheonPage = cityDetailPage(TEST_CITIES.incheon.slug);
    await incheonPage.expectCityName(TEST_CITIES.incheon.name);

    // 8. Cities 목록으로 이동
    await incheonPage.header.clickCitiesLink();
    await expect(page).toHaveURL('/cities');

    // 9. 검색 기능 사용
    await citiesListPage.searchCities(TEST_CITIES.busan.name);
    await citiesListPage.expectCityVisible(TEST_CITIES.busan.slug);

    // 10. 검색된 도시 클릭
    await citiesListPage.clickCityCard(TEST_CITIES.busan.slug);
    await expect(page).toHaveURL(/\/cities\/busan/);

    // 11. 홈으로 돌아가기
    const busanPage = cityDetailPage(TEST_CITIES.busan.slug);
    await busanPage.header.clickLogo();
    await expect(page).toHaveURL('/');
  });

  test('search and filter journey', async ({ citiesListPage, page }) => {
    // 1. Cities 페이지로 이동
    await citiesListPage.goto('/cities');
    await citiesListPage.expectSearchBarVisible();

    // 2. 검색어 입력
    await citiesListPage.searchCities('제주');
    await citiesListPage.expectCityVisible(TEST_CITIES.jeju.slug);

    // 3. 검색 초기화
    await citiesListPage.clearSearch();

    // 4. 지역 필터 적용
    await citiesListPage.applyFilter('경상도');
    await citiesListPage.expectCityVisible(TEST_CITIES.busan.slug);
    await citiesListPage.expectCityVisible(TEST_CITIES.daegu.slug);

    // 5. 필터된 도시 상세 보기
    await citiesListPage.clickCityCard(TEST_CITIES.busan.slug);
    await expect(page).toHaveURL(/\/cities\/busan/);
  });
});
