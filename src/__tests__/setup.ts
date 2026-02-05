import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import 'vitest-localstorage-mock';

// 각 테스트 후 자동 정리
afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

// window.matchMedia 모킹 (반응형 컴포넌트 테스트용)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver 모킹 (Framer Motion용)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// ResizeObserver 모킹 (Radix UI용)
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Framer Motion 모킹
vi.mock('framer-motion', () => {
  const React = { createElement: (type: any, props: any, ...children: any[]) => ({ type, props, children }) };
  return {
    motion: {
      div: (props: any) => React.createElement('div', props),
      span: (props: any) => React.createElement('span', props),
      button: (props: any) => React.createElement('button', props),
    },
    AnimatePresence: ({ children }: any) => children,
    useInView: () => true,
    useAnimation: () => ({
      start: vi.fn(),
      set: vi.fn(),
    }),
  };
});

// Embla Carousel 모킹
vi.mock('embla-carousel-react', () => ({
  default: () => [
    vi.fn(() => null),
    {
      scrollNext: vi.fn(),
      scrollPrev: vi.fn(),
      canScrollNext: () => true,
      canScrollPrev: () => false,
    },
  ],
}));
