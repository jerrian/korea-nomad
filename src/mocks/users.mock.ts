import type { User } from '@/types';

export const mockUser: Omit<User, 'password'> = {
  id: 'test-user-1',
  name: '테스트 사용자',
  email: 'test@test.com',
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const mockUserWithPassword: User = {
  ...mockUser,
  password: 'password123',
};

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: 'test-id',
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  createdAt: new Date().toISOString(),
  ...overrides,
});
