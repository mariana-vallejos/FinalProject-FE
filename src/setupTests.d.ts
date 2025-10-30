/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vitest" />
import "@testing-library/jest-dom";

declare module "vitest" {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
}
