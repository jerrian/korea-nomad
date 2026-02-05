import { expect, type Page, type Locator } from '@playwright/test';
import { TEST_IDS } from '../../config/test-ids';

/**
 * Footer Component
 *
 * 모든 페이지에서 공통으로 사용되는 푸터 컴포넌트
 */
export class FooterComponent {
  readonly footer: Locator;

  constructor(private page: Page) {
    this.footer = page.getByTestId(TEST_IDS.FOOTER);
  }

  // Assertions
  async expectVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.footer).toBeHidden();
  }
}
