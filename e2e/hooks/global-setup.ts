import { chromium, type FullConfig } from '@playwright/test';

/**
 * 글로벌 셋업
 *
 * 모든 테스트 실행 전 한 번만 실행됩니다.
 * - 환경 검증
 * - 데이터베이스 초기화 (필요시)
 * - 공통 리소스 준비
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright E2E tests...');

  // 환경 변수 확인
  const baseURL = config.use?.baseURL || 'http://localhost:3000';
  console.log(`📍 Base URL: ${baseURL}`);

  // 개발 서버 연결 확인 (webServer가 자동으로 시작함)
  console.log('⏳ Waiting for development server...');

  // 브라우저 인스턴스로 서버 응답 확인
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(baseURL, { timeout: 30000 });
    console.log('✅ Development server is ready');
  } catch (error) {
    console.error('❌ Failed to connect to development server');
    throw error;
  } finally {
    await browser.close();
  }

  console.log('✨ Global setup completed\n');
}

export default globalSetup;
