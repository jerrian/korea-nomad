import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('basic functionality', () => {
    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 300));
      expect(result.current).toBe('initial');
    });

    it('should return initial value with default delay (300ms)', () => {
      const { result } = renderHook(() => useDebounce('test'));
      expect(result.current).toBe('test');
    });

    it('should handle empty string', () => {
      const { result } = renderHook(() => useDebounce('', 300));
      expect(result.current).toBe('');
    });

    it('should handle zero', () => {
      const { result } = renderHook(() => useDebounce(0, 300));
      expect(result.current).toBe(0);
    });

    it('should handle null', () => {
      const { result } = renderHook(() => useDebounce(null, 300));
      expect(result.current).toBeNull();
    });

    it('should handle undefined', () => {
      const { result } = renderHook(() => useDebounce(undefined, 300));
      expect(result.current).toBeUndefined();
    });

    it('should handle boolean values', () => {
      const { result: trueResult } = renderHook(() => useDebounce(true, 300));
      expect(trueResult.current).toBe(true);

      const { result: falseResult } = renderHook(() => useDebounce(false, 300));
      expect(falseResult.current).toBe(false);
    });

    it('should handle object values', () => {
      const obj = { name: 'test', value: 123 };
      const { result } = renderHook(() => useDebounce(obj, 300));
      expect(result.current).toEqual(obj);
    });

    it('should handle array values', () => {
      const arr = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useDebounce(arr, 300));
      expect(result.current).toEqual(arr);
    });
  });

  describe('debounce behavior', () => {
    it('should debounce value changes', async () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'first', delay: 300 } }
      );

      expect(result.current).toBe('first');

      // 값 변경
      rerender({ value: 'second', delay: 300 });
      expect(result.current).toBe('first'); // 아직 업데이트 안됨

      // 300ms 경과
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('second'));
    });

    it('should update after specified delay', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });

      // 500ms 전에는 업데이트 안됨
      vi.advanceTimersByTime(400);
      expect(result.current).toBe('initial');

      // 500ms 후 업데이트됨
      vi.advanceTimersByTime(100);
      await waitFor(() => expect(result.current).toBe('updated'));
    });

    it('should cancel previous timer on rapid changes', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'a' } }
      );

      // 빠른 연속 변경
      rerender({ value: 'b' });
      vi.advanceTimersByTime(100);

      rerender({ value: 'c' });
      vi.advanceTimersByTime(100);

      rerender({ value: 'd' });
      vi.advanceTimersByTime(100);

      // 아직 초기값 유지
      expect(result.current).toBe('a');

      // 마지막 변경 후 300ms 경과
      vi.advanceTimersByTime(200);
      await waitFor(() => expect(result.current).toBe('d'));
    });

    it('should not update if value changes within delay period', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 1000),
        { initialProps: { value: 'first' } }
      );

      // 연속 변경 (각각 500ms 간격)
      rerender({ value: 'second' });
      vi.advanceTimersByTime(500);
      expect(result.current).toBe('first');

      rerender({ value: 'third' });
      vi.advanceTimersByTime(500);
      expect(result.current).toBe('first');

      rerender({ value: 'fourth' });
      vi.advanceTimersByTime(500);
      expect(result.current).toBe('first');
    });
  });

  describe('delay parameter', () => {
    it('should respect different delay values', async () => {
      // 100ms delay
      const { result: result100, rerender: rerender100 } = renderHook(
        ({ value }) => useDebounce(value, 100),
        { initialProps: { value: 'initial' } }
      );

      rerender100({ value: 'updated' });
      vi.advanceTimersByTime(100);
      await waitFor(() => expect(result100.current).toBe('updated'));

      // 500ms delay
      const { result: result500, rerender: rerender500 } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'initial' } }
      );

      rerender500({ value: 'updated' });
      vi.advanceTimersByTime(100);
      expect(result500.current).toBe('initial');

      vi.advanceTimersByTime(400);
      await waitFor(() => expect(result500.current).toBe('updated'));
    });

    it('should handle zero delay (immediate update)', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 0),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });
      vi.advanceTimersByTime(0);
      await waitFor(() => expect(result.current).toBe('updated'));
    });

    it('should handle very short delay', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 10),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });
      vi.advanceTimersByTime(10);
      await waitFor(() => expect(result.current).toBe('updated'));
    });

    it('should handle very long delay', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 5000),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });
      vi.advanceTimersByTime(4999);
      expect(result.current).toBe('initial');

      vi.advanceTimersByTime(1);
      await waitFor(() => expect(result.current).toBe('updated'));
    });

    it('should update delay dynamically', async () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 300 } }
      );

      // delay 변경과 함께 value 변경
      rerender({ value: 'updated', delay: 600 });

      // 300ms 후에는 아직 업데이트 안됨
      vi.advanceTimersByTime(300);
      expect(result.current).toBe('initial');

      // 600ms 후 업데이트됨
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('updated'));
    });
  });

  describe('multiple consecutive updates', () => {
    it('should only apply the last value after delay', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: '1' } }
      );

      // 빠른 연속 업데이트
      rerender({ value: '2' });
      rerender({ value: '3' });
      rerender({ value: '4' });
      rerender({ value: '5' });

      // 아직 초기값
      expect(result.current).toBe('1');

      // 300ms 후 마지막 값으로 업데이트
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('5'));
    });

    it('should handle updates with pauses', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'a' } }
      );

      // 첫 번째 업데이트
      rerender({ value: 'b' });
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('b'));

      // 두 번째 업데이트
      rerender({ value: 'c' });
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('c'));

      // 세 번째 업데이트
      rerender({ value: 'd' });
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('d'));
    });

    it('should reset timer on each value change', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'start' } }
      );

      // 여러 번 변경, 매번 타이머 리셋
      for (let i = 1; i <= 10; i++) {
        rerender({ value: `value-${i}` });
        vi.advanceTimersByTime(299); // 300ms 직전
      }

      // 아직 초기값
      expect(result.current).toBe('start');

      // 마지막 변경 후 300ms 경과
      vi.advanceTimersByTime(1);
      await waitFor(() => expect(result.current).toBe('value-10'));
    });
  });

  describe('cleanup', () => {
    it('should cleanup timer on unmount', () => {
      const { unmount } = renderHook(() => useDebounce('test', 300));

      // unmount 시 타이머가 정리되어야 함
      expect(() => unmount()).not.toThrow();
    });

    it('should cleanup previous timer on value change', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'first' } }
      );

      rerender({ value: 'second' });
      vi.advanceTimersByTime(200);

      // 새로운 타이머 시작 (이전 타이머는 정리됨)
      rerender({ value: 'third' });
      vi.advanceTimersByTime(300);

      await waitFor(() => expect(result.current).toBe('third'));
    });

    it('should not cause memory leaks with many updates', () => {
      const { rerender } = renderHook(
        ({ value }) => useDebounce(value, 100),
        { initialProps: { value: 0 } }
      );

      // 많은 업데이트 (각 업데이트마다 타이머 정리됨)
      for (let i = 1; i <= 100; i++) {
        rerender({ value: i });
      }

      expect(() => vi.advanceTimersByTime(100)).not.toThrow();
    });
  });

  describe('real-world use cases', () => {
    it('should debounce search input', async () => {
      const { result, rerender } = renderHook(
        ({ searchTerm }) => useDebounce(searchTerm, 300),
        { initialProps: { searchTerm: '' } }
      );

      // 사용자가 "react"를 빠르게 입력
      const searchText = 'react';
      for (let i = 1; i <= searchText.length; i++) {
        rerender({ searchTerm: searchText.slice(0, i) });
        vi.advanceTimersByTime(50); // 각 타이핑 사이 50ms
      }

      // 아직 초기값
      expect(result.current).toBe('');

      // 마지막 입력 후 300ms 경과
      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('react'));
    });

    it('should debounce window resize', async () => {
      const { result, rerender } = renderHook(
        ({ width }) => useDebounce(width, 500),
        { initialProps: { width: 1024 } }
      );

      // 빠른 리사이즈 시뮬레이션
      const widths = [1000, 980, 950, 920, 900];
      widths.forEach((width) => {
        rerender({ width });
        vi.advanceTimersByTime(100);
      });

      // 아직 초기값
      expect(result.current).toBe(1024);

      // 마지막 리사이즈 후 500ms 경과
      vi.advanceTimersByTime(400);
      await waitFor(() => expect(result.current).toBe(900));
    });

    it('should debounce API call trigger', async () => {
      const { result, rerender } = renderHook(
        ({ query }) => useDebounce(query, 400),
        { initialProps: { query: '' } }
      );

      // 빠른 입력
      rerender({ query: 'a' });
      vi.advanceTimersByTime(100);
      rerender({ query: 'ab' });
      vi.advanceTimersByTime(100);
      rerender({ query: 'abc' });

      // 아직 업데이트 안됨 (API 호출 안함)
      expect(result.current).toBe('');

      // 400ms 후 업데이트 (API 호출)
      vi.advanceTimersByTime(400);
      await waitFor(() => expect(result.current).toBe('abc'));
    });

    it('should debounce form field validation', async () => {
      const { result, rerender } = renderHook(
        ({ email }) => useDebounce(email, 350),
        { initialProps: { email: '' } }
      );

      // 이메일 입력 중
      rerender({ email: 't' });
      vi.advanceTimersByTime(50);
      rerender({ email: 'te' });
      vi.advanceTimersByTime(50);
      rerender({ email: 'test@' });
      vi.advanceTimersByTime(50);
      rerender({ email: 'test@example' });
      vi.advanceTimersByTime(50);
      rerender({ email: 'test@example.com' });

      // 아직 검증 안됨
      expect(result.current).toBe('');

      // 입력 완료 후 350ms 경과 → 검증 시작
      vi.advanceTimersByTime(350);
      await waitFor(() => expect(result.current).toBe('test@example.com'));
    });
  });

  describe('edge cases', () => {
    it('should handle same value updates', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'same' } }
      );

      rerender({ value: 'same' });
      rerender({ value: 'same' });
      rerender({ value: 'same' });

      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('same'));
    });

    it('should handle value changing back to original', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'original' } }
      );

      rerender({ value: 'changed' });
      vi.advanceTimersByTime(100);
      rerender({ value: 'original' });

      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toBe('original'));
    });

    it('should handle complex object changes', async () => {
      const obj1 = { id: 1, name: 'first' };
      const obj2 = { id: 2, name: 'second' };

      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: obj1 } }
      );

      rerender({ value: obj2 });
      vi.advanceTimersByTime(300);

      await waitFor(() => expect(result.current).toEqual(obj2));
    });

    it('should handle reference changes without value change', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: { key: 'value' } } }
      );

      // 새로운 객체이지만 같은 내용
      rerender({ value: { key: 'value' } });

      vi.advanceTimersByTime(300);
      await waitFor(() => expect(result.current).toEqual({ key: 'value' }));
    });

    it('should handle NaN', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 0 } }
      );

      rerender({ value: NaN });
      vi.advanceTimersByTime(300);

      await waitFor(() => expect(result.current).toBeNaN());
    });

    it('should handle Infinity', async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 0 } }
      );

      rerender({ value: Infinity });
      vi.advanceTimersByTime(300);

      await waitFor(() => expect(result.current).toBe(Infinity));
    });
  });
});
