import type { Page } from '@playwright/test';
import { TIMEOUTS } from '../test-data/constants';

/**
 * 대기 관련 유틸리티 함수
 */

/**
 * 디바운스 대기 (검색 등)
 */
export async function waitForDebounce(page: Page): Promise<void> {
  await page.waitForTimeout(TIMEOUTS.DEBOUNCE);
}

/**
 * 애니메이션 대기
 */
export async function waitForAnimation(page: Page): Promise<void> {
  await page.waitForTimeout(TIMEOUTS.ANIMATION);
}

/**
 * API 응답 대기
 */
export async function waitForAPI(page: Page): Promise<void> {
  await page.waitForTimeout(TIMEOUTS.API);
}

/**
 * 네트워크 idle 상태 대기
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * DOM 로딩 완료 대기
 */
export async function waitForDOMContentLoaded(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * 특정 셀렉터가 나타날 때까지 대기
 */
export async function waitForSelector(
  page: Page,
  selector: string,
  timeout?: number
): Promise<void> {
  await page.waitForSelector(selector, { timeout });
}

/**
 * 특정 URL로 변경될 때까지 대기
 */
export async function waitForURL(
  page: Page,
  url: string | RegExp,
  timeout?: number
): Promise<void> {
  await page.waitForURL(url, { timeout });
}

/**
 * 커스텀 조건 대기
 */
export async function waitForCondition(
  page: Page,
  condition: () => boolean | Promise<boolean>,
  timeout: number = 5000
): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await page.waitForTimeout(100);
  }
  throw new Error('Condition not met within timeout');
}
