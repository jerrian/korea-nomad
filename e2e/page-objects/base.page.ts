import { expect, type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

/**
 * Base Page Object
 *
 * 모든 페이지 객체가 상속받는 기본 클래스
 * 공통 기능과 컴포넌트 접근을 제공합니다.
 */
export abstract class BasePage {
  // 공통 컴포넌트
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(protected page: Page) {
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  /**
   * 페이지로 이동
   */
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * 페이지 로딩 완료 대기
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * URL 확인
   */
  async expectURL(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  /**
   * 페이지 제목 확인
   */
  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * 스크린샷 저장
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * 엘리먼트로 스크롤
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * 페이지 리로드
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  /**
   * 뒤로 가기
   */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  /**
   * 앞으로 가기
   */
  async goForward(): Promise<void> {
    await this.page.goForward({ waitUntil: 'networkidle' });
  }

  /**
   * 특정 시간 대기
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
