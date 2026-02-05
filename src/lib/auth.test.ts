import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createUser,
  authenticateUser,
  findUserByEmail,
  saveCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  validateEmail,
  validatePassword,
  validateName,
} from './auth';

describe('auth utility functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@domain.co.kr')).toBeNull();
      expect(validateEmail('user+tag@example.com')).toBeNull();
    });

    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('이메일을 입력해주세요.');
    });

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid')).toBe('올바른 이메일 형식이 아닙니다.');
      expect(validateEmail('test@')).toBe('올바른 이메일 형식이 아닙니다.');
      expect(validateEmail('@example.com')).toBe('올바른 이메일 형식이 아닙니다.');
      expect(validateEmail('test@domain')).toBe('올바른 이메일 형식이 아닙니다.');
      expect(validateEmail('test domain@example.com')).toBe('올바른 이메일 형식이 아닙니다.');
    });
  });

  describe('validatePassword', () => {
    it('should return null for valid password', () => {
      expect(validatePassword('password123')).toBeNull();
      expect(validatePassword('123456')).toBeNull();
      expect(validatePassword('verylongpassword')).toBeNull();
    });

    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('비밀번호를 입력해주세요.');
    });

    it('should return error for short password', () => {
      expect(validatePassword('12345')).toBe('비밀번호는 6자 이상이어야 합니다.');
      expect(validatePassword('abc')).toBe('비밀번호는 6자 이상이어야 합니다.');
      expect(validatePassword('a')).toBe('비밀번호는 6자 이상이어야 합니다.');
    });
  });

  describe('validateName', () => {
    it('should return null for valid name', () => {
      expect(validateName('홍길동')).toBeNull();
      expect(validateName('John Doe')).toBeNull();
      expect(validateName('김철수')).toBeNull();
    });

    it('should return error for empty name', () => {
      expect(validateName('')).toBe('이름을 입력해주세요.');
      expect(validateName('   ')).toBe('이름을 입력해주세요.');
    });

    it('should return error for short name', () => {
      expect(validateName('a')).toBe('이름은 2자 이상이어야 합니다.');
      expect(validateName('김')).toBe('이름은 2자 이상이어야 합니다.');
      expect(validateName(' a ')).toBe('이름은 2자 이상이어야 합니다.');
    });
  });

  describe('createUser', () => {
    it('should create user successfully', () => {
      const user = createUser('테스트 사용자', 'test@test.com', 'password123');

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name', '테스트 사용자');
      expect(user).toHaveProperty('email', 'test@test.com');
      expect(user).toHaveProperty('createdAt');
      expect(user).not.toHaveProperty('password'); // SafeUser 확인
      expect(typeof user.id).toBe('string');
      expect(user.id.length).toBeGreaterThan(0);
    });

    it('should throw error for duplicate email', () => {
      createUser('사용자 1', 'test@test.com', 'password1');

      expect(() => {
        createUser('사용자 2', 'test@test.com', 'password2');
      }).toThrow('이미 가입된 이메일입니다.');
    });

    it('should create multiple users with different emails', () => {
      const user1 = createUser('사용자 1', 'user1@test.com', 'password1');
      const user2 = createUser('사용자 2', 'user2@test.com', 'password2');
      const user3 = createUser('사용자 3', 'user3@test.com', 'password3');

      expect(user1.email).toBe('user1@test.com');
      expect(user2.email).toBe('user2@test.com');
      expect(user3.email).toBe('user3@test.com');
      expect(user1.id).not.toBe(user2.id);
      expect(user2.id).not.toBe(user3.id);
    });

    it('should persist user to localStorage', () => {
      createUser('테스트', 'test@test.com', 'password123');

      const stored = localStorage.getItem('koreanomad_users');
      expect(stored).not.toBeNull();

      const users = JSON.parse(stored!);
      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('test@test.com');
      expect(users[0].password).toBe('password123'); // 저장소에는 password 포함
    });
  });

  describe('findUserByEmail', () => {
    beforeEach(() => {
      createUser('사용자 1', 'user1@test.com', 'password1');
      createUser('사용자 2', 'user2@test.com', 'password2');
    });

    it('should find existing user by email', () => {
      const user = findUserByEmail('user1@test.com');

      expect(user).toBeDefined();
      expect(user?.email).toBe('user1@test.com');
      expect(user?.name).toBe('사용자 1');
      expect(user?.password).toBe('password1');
    });

    it('should return undefined for non-existent email', () => {
      const user = findUserByEmail('nonexistent@test.com');
      expect(user).toBeUndefined();
    });

    it('should be case-sensitive', () => {
      const user = findUserByEmail('USER1@TEST.COM');
      expect(user).toBeUndefined();
    });
  });

  describe('authenticateUser', () => {
    beforeEach(() => {
      createUser('테스트 사용자', 'test@test.com', 'password123');
    });

    it('should authenticate user with correct credentials', () => {
      const user = authenticateUser('test@test.com', 'password123');

      expect(user.email).toBe('test@test.com');
      expect(user.name).toBe('테스트 사용자');
      expect(user).not.toHaveProperty('password'); // SafeUser 확인
    });

    it('should throw error for non-existent email', () => {
      expect(() => {
        authenticateUser('wrong@test.com', 'password');
      }).toThrow('등록되지 않은 이메일입니다.');
    });

    it('should throw error for wrong password', () => {
      expect(() => {
        authenticateUser('test@test.com', 'wrongpassword');
      }).toThrow('비밀번호가 올바르지 않습니다.');
    });

    it('should be case-sensitive for email', () => {
      expect(() => {
        authenticateUser('TEST@TEST.COM', 'password123');
      }).toThrow('등록되지 않은 이메일입니다.');
    });

    it('should be case-sensitive for password', () => {
      expect(() => {
        authenticateUser('test@test.com', 'PASSWORD123');
      }).toThrow('비밀번호가 올바르지 않습니다.');
    });
  });

  describe('session management', () => {
    const mockUser = {
      id: 'test-id',
      name: '테스트 사용자',
      email: 'test@test.com',
      createdAt: new Date().toISOString(),
    };

    describe('saveCurrentUser', () => {
      it('should save user to localStorage', () => {
        saveCurrentUser(mockUser);

        const stored = localStorage.getItem('koreanomad_current_user');
        expect(stored).not.toBeNull();

        const parsedUser = JSON.parse(stored!);
        expect(parsedUser).toEqual(mockUser);
      });

      it('should overwrite existing user', () => {
        saveCurrentUser(mockUser);

        const newUser = {
          id: 'new-id',
          name: '새 사용자',
          email: 'new@test.com',
          createdAt: new Date().toISOString(),
        };

        saveCurrentUser(newUser);

        const stored = localStorage.getItem('koreanomad_current_user');
        const parsedUser = JSON.parse(stored!);
        expect(parsedUser.email).toBe('new@test.com');
      });
    });

    describe('getCurrentUser', () => {
      it('should retrieve saved user from localStorage', () => {
        saveCurrentUser(mockUser);
        const retrieved = getCurrentUser();

        expect(retrieved).toEqual(mockUser);
      });

      it('should return null when no user is saved', () => {
        const user = getCurrentUser();
        expect(user).toBeNull();
      });

      it('should return null when localStorage is empty', () => {
        localStorage.removeItem('koreanomad_current_user');
        const user = getCurrentUser();
        expect(user).toBeNull();
      });

      it('should handle invalid JSON gracefully', () => {
        localStorage.setItem('koreanomad_current_user', 'invalid json');
        expect(() => getCurrentUser()).toThrow();
      });
    });

    describe('clearCurrentUser', () => {
      it('should remove user from localStorage', () => {
        saveCurrentUser(mockUser);
        expect(localStorage.getItem('koreanomad_current_user')).not.toBeNull();

        clearCurrentUser();
        expect(localStorage.getItem('koreanomad_current_user')).toBeNull();
      });

      it('should not throw error when no user exists', () => {
        expect(() => clearCurrentUser()).not.toThrow();
      });

      it('should work after multiple saves', () => {
        saveCurrentUser(mockUser);
        saveCurrentUser(mockUser);
        saveCurrentUser(mockUser);

        clearCurrentUser();
        expect(getCurrentUser()).toBeNull();
      });
    });
  });

  describe('integration: full authentication flow', () => {
    it('should handle complete signup and login flow', () => {
      // 회원가입
      const newUser = createUser('홍길동', 'hong@test.com', 'password123');
      expect(newUser.email).toBe('hong@test.com');

      // 세션 저장
      saveCurrentUser(newUser);

      // 세션 복원
      const currentUser = getCurrentUser();
      expect(currentUser).toEqual(newUser);

      // 로그아웃
      clearCurrentUser();
      expect(getCurrentUser()).toBeNull();

      // 재로그인
      const authenticatedUser = authenticateUser('hong@test.com', 'password123');
      expect(authenticatedUser.email).toBe('hong@test.com');

      // 세션 저장
      saveCurrentUser(authenticatedUser);
      expect(getCurrentUser()).toEqual(authenticatedUser);
    });

    it('should handle multiple users', () => {
      // 여러 사용자 생성
      createUser('사용자1', 'user1@test.com', 'pass1');
      createUser('사용자2', 'user2@test.com', 'pass2');
      createUser('사용자3', 'user3@test.com', 'pass3');

      // 각 사용자 인증 가능
      const user1 = authenticateUser('user1@test.com', 'pass1');
      const user2 = authenticateUser('user2@test.com', 'pass2');
      const user3 = authenticateUser('user3@test.com', 'pass3');

      expect(user1.name).toBe('사용자1');
      expect(user2.name).toBe('사용자2');
      expect(user3.name).toBe('사용자3');

      // 마지막 로그인 사용자만 세션에 저장
      saveCurrentUser(user2);
      expect(getCurrentUser()?.email).toBe('user2@test.com');
    });

    it('should prevent duplicate registration', () => {
      createUser('사용자', 'duplicate@test.com', 'password1');

      expect(() => {
        createUser('다른사용자', 'duplicate@test.com', 'password2');
      }).toThrow('이미 가입된 이메일입니다.');

      // 첫 번째 사용자는 정상 인증
      const user = authenticateUser('duplicate@test.com', 'password1');
      expect(user.name).toBe('사용자');
    });
  });

  describe('edge cases', () => {
    it('should handle empty localStorage', () => {
      localStorage.clear();
      expect(getCurrentUser()).toBeNull();
      expect(findUserByEmail('any@test.com')).toBeUndefined();
    });

    it('should handle special characters in email', () => {
      const user = createUser('테스트', 'test+tag@example.com', 'password');
      expect(user.email).toBe('test+tag@example.com');

      const found = findUserByEmail('test+tag@example.com');
      expect(found).toBeDefined();
    });

    it('should handle unicode characters in name', () => {
      const user = createUser('김철수 👨‍💻', 'test@test.com', 'password');
      expect(user.name).toBe('김철수 👨‍💻');
    });

    it('should handle very long inputs', () => {
      const longEmail = 'a'.repeat(100) + '@example.com';
      const longPassword = 'p'.repeat(1000);
      const longName = 'n'.repeat(100);

      const user = createUser(longName, longEmail, longPassword);
      expect(user.name).toBe(longName);
      expect(user.email).toBe(longEmail);

      const authenticated = authenticateUser(longEmail, longPassword);
      expect(authenticated.email).toBe(longEmail);
    });
  });
});
