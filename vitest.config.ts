import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // 환경 설정
    environment: 'jsdom',

    // 전역 설정
    globals: true,

    // 셋업 파일
    setupFiles: ['./src/__tests__/setup.ts'],

    // 커버리지 설정
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/__tests__/**',
        'src/mocks/**',
        'src/types/**',
        'src/app/**', // Next.js App Router 파일 제외 (통합 테스트에서 커버)
        '**/*.d.ts',
        '**/node_modules/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },

    // 테스트 매칭 패턴
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next'],

    // 타임아웃 설정
    testTimeout: 10000,
    hookTimeout: 10000,
  },

  // 경로 별칭 설정 (tsconfig.json과 동일하게)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
