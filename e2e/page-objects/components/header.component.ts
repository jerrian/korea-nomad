import { expect, type Page, type Locator } from '@playwright/test';
import { TEST_IDS } from '../../config/test-ids';

/**
 * Header Component
 *
 * 모든 페이지에서 공통으로 사용되는 헤더 컴포넌트
 */
export class HeaderComponent {
  // Locators
  readonly header: Locator;
  readonly logo: Locator;
  readonly navCities: Locator;
  readonly navCommunity: Locator;
  readonly navAbout: Locator;
  readonly loginButton: Locator;
  readonly signupButton: Locator;
  readonly userMenuButton: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly mobileMenuButton: Locator;

  constructor(private page: Page) {
    this.header = page.getByTestId(TEST_IDS.HEADER);
    this.logo = page.getByTestId(TEST_IDS.LOGO);
    this.navCities = page.getByTestId(TEST_IDS.NAV_CITIES);
    this.navCommunity = page.getByTestId(TEST_IDS.NAV_COMMUNITY);
    this.navAbout = page.getByTestId(TEST_IDS.NAV_ABOUT);
    this.loginButton = page.getByTestId(TEST_IDS.LOGIN_BUTTON);
    this.signupButton = page.getByTestId(TEST_IDS.SIGNUP_BUTTON);
    this.userMenuButton = page.getByTestId(TEST_IDS.USER_MENU_BUTTON);
    this.userMenu = page.getByTestId(TEST_IDS.USER_MENU);
    this.logoutButton = page.getByTestId(TEST_IDS.LOGOUT_BUTTON);
    this.mobileMenuButton = page.getByTestId(TEST_IDS.MOBILE_MENU_BUTTON);
  }

  // Actions
  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async clickCitiesLink(): Promise<void> {
    await this.navCities.click();
  }

  async clickCommunityLink(): Promise<void> {
    await this.navCommunity.click();
  }

  async clickAboutLink(): Promise<void> {
    await this.navAbout.click();
  }

  async openLoginModal(): Promise<void> {
    await this.loginButton.click();
  }

  async openSignupModal(): Promise<void> {
    await this.signupButton.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.logoutButton.click();
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  // Assertions
  async expectVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  async expectLogoVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async expectLoginButtonVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async expectSignupButtonVisible(): Promise<void> {
    await expect(this.signupButton).toBeVisible();
  }

  async expectUserMenuVisible(): Promise<void> {
    await expect(this.userMenuButton).toBeVisible();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.userMenuButton).toBeVisible();
    await expect(this.loginButton).not.toBeVisible();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.userMenuButton).not.toBeVisible();
  }
}
