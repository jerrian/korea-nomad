import type { Page } from '@playwright/test';
import { LOCAL_STORAGE_KEYS } from '../test-data/constants';

/**
 * localStorage 관련 유틸리티 함수
 */

/**
 * 사용자 로그인 상태 설정
 */
export async function setAuthenticatedUser(
  page: Page,
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }
): Promise<void> {
  await page.evaluate(
    ({ key, user }) => {
      localStorage.setItem(key, JSON.stringify(user));
    },
    { key: LOCAL_STORAGE_KEYS.CURRENT_USER, user }
  );
}

/**
 * 현재 로그인된 사용자 가져오기
 */
export async function getCurrentUser(page: Page): Promise<any> {
  return await page.evaluate((key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }, LOCAL_STORAGE_KEYS.CURRENT_USER);
}

/**
 * 로그아웃 (현재 사용자 정보 제거)
 */
export async function clearCurrentUser(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
  }, LOCAL_STORAGE_KEYS.CURRENT_USER);
}

/**
 * 사용자 목록 설정
 */
export async function setUsers(
  page: Page,
  users: Array<{
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
  }>
): Promise<void> {
  await page.evaluate(
    ({ key, users }) => {
      localStorage.setItem(key, JSON.stringify(users));
    },
    { key: LOCAL_STORAGE_KEYS.USERS, users }
  );
}

/**
 * 모든 사용자 가져오기
 */
export async function getAllUsers(page: Page): Promise<any[]> {
  return await page.evaluate((key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }, LOCAL_STORAGE_KEYS.USERS);
}

/**
 * 모든 localStorage 데이터 초기화
 */
export async function clearAllStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}
