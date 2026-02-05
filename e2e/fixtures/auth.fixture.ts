import { test as base, type Page } from '@playwright/test';
import { test as testBase } from './base';
import { setAuthenticatedUser } from '../utils/storage';
import { TEST_USERS } from '../test-data/users.data';

/**
 * Auth Fixtures
 *
 * 인증 관련 픽스처
 */

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type AuthFixtures = {
  authenticatedPage: Page;
  testUser: User;
};

export const authTest = testBase.extend<AuthFixtures>({
  testUser: async ({}, use) => {
    const user: User = {
      id: 'test-user-id-' + Date.now(),
      name: TEST_USERS.valid.name,
      email: TEST_USERS.valid.email,
      createdAt: new Date().toISOString(),
    };
    await use(user);
  },

  authenticatedPage: async ({ page, testUser }, use) => {
    // localStorage에 사용자 정보 설정하여 로그인 상태 시뮬레이션
    await page.goto('/');
    await setAuthenticatedUser(page, testUser);
    await page.reload();
    await use(page);
  },
});

export { expect } from '@playwright/test';
