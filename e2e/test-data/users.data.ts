/**
 * 테스트용 사용자 데이터
 */

export const TEST_USERS = {
  valid: {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  },
  admin: {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
  },
  valid2: {
    name: 'Test User 2',
    email: 'test2@example.com',
    password: 'password456',
  },
  invalid: {
    email: 'invalid-email',
    password: '12345', // Too short
  },
  invalidEmail: {
    email: '',
    password: 'password123',
  },
  invalidPassword: {
    email: 'test@example.com',
    password: '',
  },
} as const;
