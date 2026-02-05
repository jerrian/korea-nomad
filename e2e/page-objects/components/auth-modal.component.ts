import { expect, type Page, type Locator } from '@playwright/test';
import { TEST_IDS } from '../../config/test-ids';

/**
 * Auth Modal Component
 *
 * 로그인/회원가입 모달
 */
export class AuthModalComponent {
  readonly modal: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nameInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly switchLink: Locator;
  readonly errorMessage: Locator;

  constructor(
    private page: Page,
    private type: 'login' | 'signup'
  ) {
    const modalTestId = type === 'login' ? TEST_IDS.LOGIN_MODAL : TEST_IDS.SIGNUP_MODAL;
    this.modal = page.getByTestId(modalTestId);
    this.emailInput = page.getByTestId(TEST_IDS.AUTH_EMAIL_INPUT);
    this.passwordInput = page.getByTestId(TEST_IDS.AUTH_PASSWORD_INPUT);
    this.nameInput = page.getByTestId(TEST_IDS.AUTH_NAME_INPUT);
    this.confirmPasswordInput = page.getByTestId(TEST_IDS.AUTH_CONFIRM_PASSWORD_INPUT);
    this.submitButton = page.getByTestId(TEST_IDS.AUTH_SUBMIT_BUTTON);
    this.switchLink = page.getByTestId(TEST_IDS.AUTH_SWITCH_LINK);
    this.errorMessage = page.getByTestId(TEST_IDS.AUTH_ERROR_MESSAGE);
  }

  // Actions
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillName(name: string): Promise<void> {
    if (this.type !== 'signup') {
      throw new Error('Name field is only available in signup modal');
    }
    await this.nameInput.fill(name);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    if (this.type !== 'signup') {
      throw new Error('Confirm password field is only available in signup modal');
    }
    await this.confirmPasswordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async switchMode(): Promise<void> {
    await this.switchLink.click();
  }

  async login(email: string, password: string): Promise<void> {
    if (this.type !== 'login') {
      throw new Error('Login method is only available in login modal');
    }
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async signup(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    if (this.type !== 'signup') {
      throw new Error('Signup method is only available in signup modal');
    }
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
    await this.submit();
  }

  // Assertions
  async expectModalVisible(): Promise<void> {
    await expect(this.modal).toBeVisible();
  }

  async expectModalClosed(): Promise<void> {
    await expect(this.modal).not.toBeVisible();
  }

  async expectErrorMessage(message: string | RegExp): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectNoErrorMessage(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }
}
