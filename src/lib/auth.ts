import type { User } from '@/types';

const USERS_KEY = 'koreanomad_users';
const CURRENT_USER_KEY = 'koreanomad_current_user';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function toSafeUser(user: User): Omit<User, 'password'> {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

// localStorage 헬퍼
function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveStoredUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// 사용자 CRUD
export function findUserByEmail(email: string): User | undefined {
  return getStoredUsers().find((u) => u.email === email);
}

export function createUser(name: string, email: string, password: string): Omit<User, 'password'> {
  const users = getStoredUsers();

  if (users.some((u) => u.email === email)) {
    throw new Error('이미 가입된 이메일입니다.');
  }

  const newUser: User = {
    id: generateId(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  return toSafeUser(newUser);
}

export function authenticateUser(email: string, password: string): Omit<User, 'password'> {
  const user = findUserByEmail(email);

  if (!user) {
    throw new Error('등록되지 않은 이메일입니다.');
  }

  if (user.password !== password) {
    throw new Error('비밀번호가 올바르지 않습니다.');
  }

  return toSafeUser(user);
}

// 현재 세션 관리
export function saveCurrentUser(user: Omit<User, 'password'>): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): Omit<User, 'password'> | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// 유효성 검사
export function validateEmail(email: string): string | null {
  if (!email) return '이메일을 입력해주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return '이름을 입력해주세요.';
  if (name.trim().length < 2) return '이름은 2자 이상이어야 합니다.';
  return null;
}
