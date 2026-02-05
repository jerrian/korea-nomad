import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@/contexts/AuthContext';

// 모든 Provider를 포함한 래퍼
function AllProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

// 커스텀 render 함수
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// 인증된 상태로 렌더링하는 헬퍼
export function renderWithAuth(
  ui: ReactElement,
  user = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@test.com',
    createdAt: new Date().toISOString(),
  }
) {
  // localStorage에 사용자 설정
  localStorage.setItem('koreanomad_current_user', JSON.stringify(user));

  return renderWithProviders(ui);
}

// 모든 Testing Library 유틸리티 re-export
export * from '@testing-library/react';
export { userEvent };
