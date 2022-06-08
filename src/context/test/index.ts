import { createContext } from 'react';

export type TestContextValue = {
  name: string;
  age: number;
  setName(name: string): void;
  setAge(age: number): void;
};

export const DEFAULT_TEST_CONTEXT_VALUE: TestContextValue = {
  name: 'wang',
  age: 25,
  setName(_name: string) {},
  setAge(_age: number) {}
};

export const TestContext = createContext(DEFAULT_TEST_CONTEXT_VALUE);
