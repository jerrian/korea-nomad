import type { Page } from '@playwright/test';

/**
 * localStorage 초기화
 */
export async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}

/**
 * localStorage에 값 설정
 */
export async function setLocalStorage(
  page: Page,
  key: string,
  value: unknown
): Promise<void> {
  await page.evaluate(
    ({ key, value }) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    { key, value }
  );
}

/**
 * localStorage에서 값 가져오기
 */
export async function getLocalStorage<T>(
  page: Page,
  key: string
): Promise<T | null> {
  return await page.evaluate((key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }, key);
}

/**
 * 페이지 리로드
 */
export async function reloadPage(page: Page): Promise<void> {
  await page.reload({ waitUntil: 'networkidle' });
}

/**
 * 엘리먼트가 보일 때까지 스크롤
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * URL 파라미터 가져오기
 */
export async function getURLParam(page: Page, param: string): Promise<string | null> {
  return await page.evaluate((param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }, param);
}
