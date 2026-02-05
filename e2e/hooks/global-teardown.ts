import type { FullConfig } from '@playwright/test';

/**
 * 글로벌 테어다운
 *
 * 모든 테스트 실행 후 한 번만 실행됩니다.
 * - 리소스 정리
 * - 임시 파일 삭제
 * - 연결 종료
 */
async function globalTeardown(config: FullConfig) {
  console.log('\n🧹 Cleaning up after tests...');

  // 필요시 정리 작업 수행
  // 예: 테스트 중 생성된 임시 파일 삭제
  // 예: 테스트 데이터베이스 정리

  console.log('✅ Global teardown completed');
}

export default globalTeardown;
