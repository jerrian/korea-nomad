import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import * as authLib from '@/lib/auth';

// 래퍼 컴포넌트
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should provide initial state with no user', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isLoginModalOpen).toBe(false);
      expect(result.current.isSignupModalOpen).toBe(false);
    });

    it('should throw error when used outside AuthProvider', () => {
      // Console error 억제
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth는 AuthProvider 내부에서 사용해야 합니다.');

      consoleError.mockRestore();
    });
  });

  describe('session restoration', () => {
    it('should restore session from localStorage on mount', async () => {
      const savedUser = {
        id: 'saved-id',
        name: 'Saved User',
        email: 'saved@test.com',
        createdAt: new Date().toISOString(),
      };

      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(savedUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // 로딩이 끝날 때까지 대기
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 세션이 복원되어야 함
      await waitFor(() => {
        expect(result.current.user).toEqual(savedUser);
        expect(result.current.isAuthenticated).toBe(true);
      });
    });

    it('should handle no saved session', async () => {
      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('login', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@test.com',
      createdAt: new Date().toISOString(),
    };

    beforeEach(() => {
      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(null);
    });

    it('should login successfully with valid credentials', async () => {
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'authenticateUser').mockReturnValue(mockUser);
      const saveSpy = vi.spyOn(authLib, 'saveCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let loginResult: any;
      act(() => {
        loginResult = result.current.login('test@test.com', 'password123');
      });

      expect(loginResult.success).toBe(true);
      expect(loginResult.error).toBeUndefined();
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('test@test.com');
      expect(saveSpy).toHaveBeenCalledWith(mockUser);
    });

    it('should close login modal on successful login', async () => {
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'authenticateUser').mockReturnValue(mockUser);
      vi.spyOn(authLib, 'saveCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 로그인 모달 열기
      act(() => {
        result.current.openLoginModal();
      });

      expect(result.current.isLoginModalOpen).toBe(true);

      // 로그인
      act(() => {
        result.current.login('test@test.com', 'password123');
      });

      expect(result.current.isLoginModalOpen).toBe(false);
    });

    it('should handle email validation error', async () => {
      vi.spyOn(authLib, 'validateEmail').mockReturnValue('이메일을 입력해주세요.');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let loginResult: any;
      act(() => {
        loginResult = result.current.login('', 'password123');
      });

      expect(loginResult.success).toBe(false);
      expect(loginResult.error).toBe('이메일을 입력해주세요.');
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle password validation error', async () => {
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue('비밀번호를 입력해주세요.');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let loginResult: any;
      act(() => {
        loginResult = result.current.login('test@test.com', '');
      });

      expect(loginResult.success).toBe(false);
      expect(loginResult.error).toBe('비밀번호를 입력해주세요.');
    });

    it('should handle authentication error', async () => {
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'authenticateUser').mockImplementation(() => {
        throw new Error('등록되지 않은 이메일입니다.');
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let loginResult: any;
      act(() => {
        loginResult = result.current.login('wrong@test.com', 'password');
      });

      expect(loginResult.success).toBe(false);
      expect(loginResult.error).toBe('등록되지 않은 이메일입니다.');
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('signup', () => {
    const mockUser = {
      id: '1',
      name: 'New User',
      email: 'new@test.com',
      createdAt: new Date().toISOString(),
    };

    beforeEach(() => {
      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(null);
    });

    it('should signup successfully with valid data', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'createUser').mockReturnValue(mockUser);
      const saveSpy = vi.spyOn(authLib, 'saveCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signupResult: any;
      act(() => {
        signupResult = result.current.signup('New User', 'new@test.com', 'password123', 'password123');
      });

      expect(signupResult.success).toBe(true);
      expect(signupResult.error).toBeUndefined();
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('new@test.com');
      expect(saveSpy).toHaveBeenCalledWith(mockUser);
    });

    it('should close signup modal on successful signup', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'createUser').mockReturnValue(mockUser);
      vi.spyOn(authLib, 'saveCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 회원가입 모달 열기
      act(() => {
        result.current.openSignupModal();
      });

      expect(result.current.isSignupModalOpen).toBe(true);

      // 회원가입
      act(() => {
        result.current.signup('New User', 'new@test.com', 'password123', 'password123');
      });

      expect(result.current.isSignupModalOpen).toBe(false);
    });

    it('should handle name validation error', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue('이름을 입력해주세요.');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signupResult: any;
      act(() => {
        signupResult = result.current.signup('', 'new@test.com', 'password123', 'password123');
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('이름을 입력해주세요.');
    });

    it('should handle email validation error', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue('올바른 이메일 형식이 아닙니다.');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signupResult: any;
      act(() => {
        signupResult = result.current.signup('New User', 'invalid', 'password123', 'password123');
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('올바른 이메일 형식이 아닙니다.');
    });

    it('should handle password validation error', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue('비밀번호는 6자 이상이어야 합니다.');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signupResult: any;
      act(() => {
        signupResult = result.current.signup('New User', 'new@test.com', '12345', '12345');
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('비밀번호는 6자 이상이어야 합니다.');
    });

    it('should handle password mismatch', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signupResult: any;
      act(() => {
        signupResult = result.current.signup('New User', 'new@test.com', 'password123', 'password456');
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('비밀번호가 일치하지 않습니다.');
    });

    it('should handle duplicate email error', async () => {
      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'createUser').mockImplementation(() => {
        throw new Error('이미 가입된 이메일입니다.');
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let signupResult: any;
      act(() => {
        signupResult = result.current.signup('New User', 'existing@test.com', 'password123', 'password123');
      });

      expect(signupResult.success).toBe(false);
      expect(signupResult.error).toBe('이미 가입된 이메일입니다.');
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        createdAt: new Date().toISOString(),
      };

      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(mockUser);
      const clearSpy = vi.spyOn(authLib, 'clearCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 초기에 사용자가 로그인되어 있음
      expect(result.current.isAuthenticated).toBe(true);

      // 로그아웃
      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(clearSpy).toHaveBeenCalled();
    });

    it('should not throw error when logging out without user', async () => {
      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(null);
      vi.spyOn(authLib, 'clearCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(() => {
        act(() => {
          result.current.logout();
        });
      }).not.toThrow();
    });
  });

  describe('modal state management', () => {
    beforeEach(() => {
      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(null);
    });

    it('should open login modal', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.openLoginModal();
      });

      expect(result.current.isLoginModalOpen).toBe(true);
      expect(result.current.isSignupModalOpen).toBe(false);
    });

    it('should open signup modal', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.openSignupModal();
      });

      expect(result.current.isSignupModalOpen).toBe(true);
      expect(result.current.isLoginModalOpen).toBe(false);
    });

    it('should close all modals', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.openLoginModal();
      });

      expect(result.current.isLoginModalOpen).toBe(true);

      act(() => {
        result.current.closeModals();
      });

      expect(result.current.isLoginModalOpen).toBe(false);
      expect(result.current.isSignupModalOpen).toBe(false);
    });

    it('should switch from signup to login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.openSignupModal();
      });

      expect(result.current.isSignupModalOpen).toBe(true);

      act(() => {
        result.current.switchToLogin();
      });

      expect(result.current.isLoginModalOpen).toBe(true);
      expect(result.current.isSignupModalOpen).toBe(false);
    });

    it('should switch from login to signup', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.openLoginModal();
      });

      expect(result.current.isLoginModalOpen).toBe(true);

      act(() => {
        result.current.switchToSignup();
      });

      expect(result.current.isSignupModalOpen).toBe(true);
      expect(result.current.isLoginModalOpen).toBe(false);
    });

    it('should close signup modal when opening login modal', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.openSignupModal();
      });

      expect(result.current.isSignupModalOpen).toBe(true);

      act(() => {
        result.current.openLoginModal();
      });

      expect(result.current.isLoginModalOpen).toBe(true);
      expect(result.current.isSignupModalOpen).toBe(false);
    });
  });

  describe('integration: full user flow', () => {
    beforeEach(() => {
      vi.spyOn(authLib, 'getCurrentUser').mockReturnValue(null);
    });

    it('should handle complete user journey', async () => {
      const mockUser = {
        id: '1',
        name: 'Journey User',
        email: 'journey@test.com',
        createdAt: new Date().toISOString(),
      };

      vi.spyOn(authLib, 'validateName').mockReturnValue(null);
      vi.spyOn(authLib, 'validateEmail').mockReturnValue(null);
      vi.spyOn(authLib, 'validatePassword').mockReturnValue(null);
      vi.spyOn(authLib, 'createUser').mockReturnValue(mockUser);
      vi.spyOn(authLib, 'saveCurrentUser').mockImplementation(() => {});
      vi.spyOn(authLib, 'clearCurrentUser').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // 1. 회원가입 모달 열기
      act(() => {
        result.current.openSignupModal();
      });

      expect(result.current.isSignupModalOpen).toBe(true);

      // 2. 회원가입
      act(() => {
        result.current.signup('Journey User', 'journey@test.com', 'password123', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isSignupModalOpen).toBe(false);

      // 3. 로그아웃
      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);

      // 4. 로그인 모달 열기
      act(() => {
        result.current.openLoginModal();
      });

      expect(result.current.isLoginModalOpen).toBe(true);

      // 5. 로그인
      vi.spyOn(authLib, 'authenticateUser').mockReturnValue(mockUser);

      act(() => {
        result.current.login('journey@test.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoginModalOpen).toBe(false);
    });
  });
});
