import { expect, type Page } from '@playwright/test';

/**
 * 도시 카드 개수 확인
 */
export async function expectCityCardCount(
  page: Page,
  count: number
): Promise<void> {
  const cards = page.locator('[data-testid^="city-card-"]');
  await expect(cards).toHaveCount(count);
}

/**
 * URL 패턴 확인
 */
export async function expectURLPattern(
  page: Page,
  pattern: string | RegExp
): Promise<void> {
  await expect(page).toHaveURL(pattern);
}

/**
 * 페이지 제목 확인
 */
export async function expectPageTitle(
  page: Page,
  title: string | RegExp
): Promise<void> {
  await expect(page).toHaveTitle(title);
}

/**
 * 로컬 스토리지에 키가 존재하는지 확인
 */
export async function expectLocalStorageKey(
  page: Page,
  key: string
): Promise<void> {
  const value = await page.evaluate((key) => {
    return localStorage.getItem(key);
  }, key);
  expect(value).not.toBeNull();
}

/**
 * 로컬 스토리지에 키가 없는지 확인
 */
export async function expectNoLocalStorageKey(
  page: Page,
  key: string
): Promise<void> {
  const value = await page.evaluate((key) => {
    return localStorage.getItem(key);
  }, key);
  expect(value).toBeNull();
}

/**
 * 엘리먼트가 보이는지 확인
 */
export async function expectVisible(
  page: Page,
  selector: string
): Promise<void> {
  await expect(page.locator(selector)).toBeVisible();
}

/**
 * 엘리먼트가 숨겨져 있는지 확인
 */
export async function expectHidden(
  page: Page,
  selector: string
): Promise<void> {
  await expect(page.locator(selector)).toBeHidden();
}

/**
 * 텍스트 포함 여부 확인
 */
export async function expectTextContent(
  page: Page,
  selector: string,
  text: string | RegExp
): Promise<void> {
  await expect(page.locator(selector)).toContainText(text);
}
