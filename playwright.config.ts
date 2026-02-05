import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 테스트 디렉토리
  testDir: './e2e/tests',

  // 타임아웃 설정
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  // 테스트 실행
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html', { host: '0.0.0.0', port: 8242, outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],

  // 글로벌 셋업/테어다운
  globalSetup: './e2e/hooks/global-setup.ts',
  globalTeardown: './e2e/hooks/global-teardown.ts',

  // 공통 설정
  use: {
    // Base URL
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',

    // 첫 번째 재시도 시 trace 수집
    trace: 'on-first-retry',

    // 실패 시 스크린샷
    screenshot: 'only-on-failure',

    // 재시도 시 비디오
    video: 'retain-on-failure',

    // 액션 타임아웃
    actionTimeout: 10000,
  },

  // 프로젝트 설정 (Chromium 기반 브라우저만 지원)
  projects: [
    // 데스크톱 브라우저
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // 모바일 뷰포트
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    // 태블릿
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
  ],

  // 웹 서버 (개발 서버 자동 시작)
  webServer: {
    command: 'npm run dev',
    url: 'http://0.0.0.0:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
