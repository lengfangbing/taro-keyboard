export const is = {
  boolean(val: unknown): val is boolean {
    return typeof val === 'boolean';
  },
  number(val: unknown): val is number {
    return typeof val === 'number';
  },
  string(val: unknown): val is string {
    return typeof val === 'string';
  },
  array<T = any>(val: unknown): val is Array<T> {
    return Array.isArray(val);
  },
  record<T = Record<string, any>>(val: unknown): val is T {
    return Object.prototype.toString.call(val) === '[object Object]';
  },
  func(val: unknown): val is (...args) => any {
    return Object.prototype.toString.call(val) === '[object Function]';
  },
  nil(val: unknown): val is unknown | null {
    return val === undefined || val === null;
  }
};
