'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '@/types';
import {
  authenticateUser,
  createUser,
  saveCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  validateEmail,
  validatePassword,
  validateName,
} from '@/lib/auth';

type SafeUser = Omit<User, 'password'>;

interface AuthContextValue {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // 모달 상태
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  openLoginModal: () => void;
  openSignupModal: () => void;
  closeModals: () => void;
  switchToLogin: () => void;
  switchToSignup: () => void;
  // 인증 액션
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, confirmPassword: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // 초기 로딩: localStorage에서 세션 복원 (외부 시스템 동기화)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const openLoginModal = useCallback(() => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  }, []);

  const openSignupModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  }, []);

  const closeModals = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  }, []);

  const switchToLogin = useCallback(() => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  }, []);

  const switchToSignup = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const emailError = validateEmail(email);
    if (emailError) return { success: false, error: emailError };

    const passwordError = validatePassword(password);
    if (passwordError) return { success: false, error: passwordError };

    try {
      const authenticatedUser = authenticateUser(email, password);
      setUser(authenticatedUser);
      saveCurrentUser(authenticatedUser);
      setIsLoginModalOpen(false);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }, []);

  const signup = useCallback((name: string, email: string, password: string, confirmPassword: string) => {
    const nameError = validateName(name);
    if (nameError) return { success: false, error: nameError };

    const emailError = validateEmail(email);
    if (emailError) return { success: false, error: emailError };

    const passwordError = validatePassword(password);
    if (passwordError) return { success: false, error: passwordError };

    if (password !== confirmPassword) {
      return { success: false, error: '비밀번호가 일치하지 않습니다.' };
    }

    try {
      const newUser = createUser(name, email, password);
      setUser(newUser);
      saveCurrentUser(newUser);
      setIsSignupModalOpen(false);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoginModalOpen,
        isSignupModalOpen,
        openLoginModal,
        openSignupModal,
        closeModals,
        switchToLogin,
        switchToSignup,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
