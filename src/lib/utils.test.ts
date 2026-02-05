import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  describe('basic functionality', () => {
    it('should merge class names', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('should handle single class name', () => {
      expect(cn('text-center')).toBe('text-center');
    });

    it('should handle empty input', () => {
      expect(cn()).toBe('');
    });

    it('should handle empty string', () => {
      expect(cn('')).toBe('');
    });

    it('should filter out falsy values', () => {
      expect(cn('base', null, undefined, false, 0, '')).toBe('base');
    });
  });

  describe('conditional classes', () => {
    it('should handle conditional classes with truthy values', () => {
      expect(cn('base', true && 'truthy')).toBe('base truthy');
    });

    it('should handle conditional classes with falsy values', () => {
      expect(cn('base', false && 'falsy')).toBe('base');
    });

    it('should handle multiple conditional classes', () => {
      const isActive = true;
      const isDisabled = false;

      expect(cn('btn', isActive && 'active', isDisabled && 'disabled')).toBe('btn active');
    });

    it('should handle ternary operators', () => {
      const isLarge = true;
      expect(cn('btn', isLarge ? 'text-lg' : 'text-sm')).toBe('btn text-lg');

      const isSmall = false;
      expect(cn('btn', isSmall ? 'text-sm' : 'text-lg')).toBe('btn text-lg');
    });
  });

  describe('tailwind-merge functionality', () => {
    it('should merge conflicting Tailwind classes (last one wins)', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should merge conflicting padding classes', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
      expect(cn('pt-2', 'pt-4')).toBe('pt-4');
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('py-2', 'py-4')).toBe('py-4');
    });

    it('should merge conflicting margin classes', () => {
      expect(cn('m-2', 'm-4')).toBe('m-4');
      expect(cn('mt-2', 'mt-4')).toBe('mt-4');
      expect(cn('mx-2', 'mx-4')).toBe('mx-4');
      expect(cn('my-2', 'my-4')).toBe('my-4');
    });

    it('should merge conflicting text color classes', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
      expect(cn('text-gray-400', 'text-green-600')).toBe('text-green-600');
    });

    it('should merge conflicting background color classes', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
      expect(cn('bg-white', 'bg-black')).toBe('bg-black');
    });

    it('should merge conflicting display classes', () => {
      expect(cn('block', 'flex')).toBe('flex');
      expect(cn('hidden', 'block')).toBe('block');
      expect(cn('inline', 'inline-block')).toBe('inline-block');
    });

    it('should keep non-conflicting classes', () => {
      expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
      expect(cn('flex', 'items-center', 'justify-between')).toBe('flex items-center justify-between');
    });

    it('should handle responsive classes', () => {
      expect(cn('text-sm', 'md:text-lg')).toBe('text-sm md:text-lg');
      expect(cn('px-2', 'md:px-4', 'lg:px-6')).toBe('px-2 md:px-4 lg:px-6');
    });

    it('should merge responsive conflicting classes', () => {
      expect(cn('px-2', 'md:px-4', 'px-6')).toBe('md:px-4 px-6');
      expect(cn('text-red-500', 'md:text-blue-500', 'text-green-500')).toBe('md:text-blue-500 text-green-500');
    });

    it('should handle hover and focus states', () => {
      expect(cn('text-black', 'hover:text-blue-500')).toBe('text-black hover:text-blue-500');
      expect(cn('bg-white', 'focus:bg-gray-100')).toBe('bg-white focus:bg-gray-100');
    });

    it('should merge conflicting hover states', () => {
      expect(cn('hover:bg-red-500', 'hover:bg-blue-500')).toBe('hover:bg-blue-500');
    });
  });

  describe('array handling', () => {
    it('should handle arrays of class names', () => {
      expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
    });

    it('should handle nested arrays', () => {
      expect(cn(['px-4', ['py-2', 'mx-auto']])).toBe('px-4 py-2 mx-auto');
    });

    it('should handle arrays with falsy values', () => {
      expect(cn(['px-4', false, 'py-2', null, 'mx-auto'])).toBe('px-4 py-2 mx-auto');
    });

    it('should handle empty arrays', () => {
      expect(cn([])).toBe('');
      expect(cn([''])).toBe('');
    });
  });

  describe('object handling', () => {
    it('should handle objects with boolean values', () => {
      expect(cn({ 'bg-red-500': true, 'text-white': false })).toBe('bg-red-500');
    });

    it('should handle objects with all true values', () => {
      expect(cn({ 'px-4': true, 'py-2': true, 'rounded': true })).toBe('px-4 py-2 rounded');
    });

    it('should handle objects with all false values', () => {
      expect(cn({ 'px-4': false, 'py-2': false })).toBe('');
    });

    it('should handle empty objects', () => {
      expect(cn({})).toBe('');
    });
  });

  describe('mixed inputs', () => {
    it('should handle mixed strings, arrays, and objects', () => {
      const result = cn('base', ['px-4', 'py-2'], { 'bg-blue-500': true, 'text-white': false }, 'extra');
      expect(result).toBe('base px-4 py-2 bg-blue-500 extra');
    });

    it('should handle complex mixed inputs with conditionals', () => {
      const isActive = true;
      const isDisabled = false;

      const result = cn(
        'btn',
        ['px-4', 'py-2'],
        {
          'bg-blue-500': isActive,
          'bg-gray-300': isDisabled,
        },
        isActive && 'active',
        'rounded'
      );

      expect(result).toBe('btn px-4 py-2 bg-blue-500 active rounded');
    });

    it('should handle undefined, null, and false values mixed with valid classes', () => {
      expect(cn('base', undefined, null, false, 'extra')).toBe('base extra');
    });

    it('should handle multiple arguments with conflicting Tailwind classes', () => {
      expect(cn('px-2', 'py-2', ['px-4'], { 'px-6': true })).toBe('py-2 px-6');
    });
  });

  describe('real-world use cases', () => {
    it('should handle button variants', () => {
      const variant = 'primary';

      const classes = cn(
        'btn',
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-500 text-white'
      );

      expect(classes).toBe('btn px-4 py-2 rounded bg-blue-500 text-white');
    });

    it('should handle component with size prop', () => {
      const size = 'lg';

      const classes = cn(
        'btn',
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        }
      );

      expect(classes).toBe('btn px-6 py-3 text-lg');
    });

    it('should handle card with conditional states', () => {
      const isHovered = true;
      const isSelected = false;

      const classes = cn(
        'card',
        'p-4 rounded shadow',
        isHovered && 'shadow-lg',
        isSelected && 'border-2 border-blue-500'
      );

      // tailwind-merge는 shadow와 shadow-lg를 병합하여 shadow-lg만 남김
      expect(classes).toBe('card p-4 rounded shadow-lg');
    });

    it('should handle input with validation states', () => {
      const hasError = true;
      const isDisabled = false;

      const classes = cn(
        'input',
        'px-3 py-2 border rounded',
        hasError && 'border-red-500',
        !hasError && 'border-gray-300',
        isDisabled && 'bg-gray-100 cursor-not-allowed'
      );

      expect(classes).toBe('input px-3 py-2 border rounded border-red-500');
    });

    it('should override base classes with props', () => {
      const baseClasses = 'text-sm px-4 py-2';
      const propClasses = 'text-lg px-6';

      const result = cn(baseClasses, propClasses);

      expect(result).toBe('py-2 text-lg px-6');
    });
  });

  describe('edge cases', () => {
    it('should handle very long class names', () => {
      const longClasses = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
      expect(cn(longClasses)).toBe(longClasses);
    });

    it('should handle duplicate classes', () => {
      expect(cn('px-4', 'py-2', 'px-4')).toBe('py-2 px-4');
    });

    it('should handle classes with numbers', () => {
      expect(cn('z-10', 'z-20')).toBe('z-20');
      expect(cn('gap-4', 'gap-8')).toBe('gap-8');
    });

    it('should handle classes with special characters', () => {
      expect(cn('w-1/2', 'w-full')).toBe('w-full');
      expect(cn('top-0', 'top-1/2')).toBe('top-1/2');
    });

    it('should handle important modifier', () => {
      expect(cn('text-red-500', '!text-blue-500')).toBe('text-red-500 !text-blue-500');
    });

    it('should handle arbitrary values', () => {
      expect(cn('w-[200px]', 'w-full')).toBe('w-full');
      expect(cn('text-[#ff0000]', 'text-blue-500')).toBe('text-blue-500');
    });
  });

  describe('type safety', () => {
    it('should accept various input types', () => {
      // String
      expect(() => cn('class')).not.toThrow();

      // Array
      expect(() => cn(['class1', 'class2'])).not.toThrow();

      // Object
      expect(() => cn({ class: true })).not.toThrow();

      // Mixed
      expect(() => cn('base', ['array'], { obj: true })).not.toThrow();

      // Conditional
      expect(() => cn(true && 'conditional')).not.toThrow();
    });

    it('should return string', () => {
      const result = cn('class');
      expect(typeof result).toBe('string');
    });
  });
});
