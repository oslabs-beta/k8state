import "@testing-library/jest-dom/vitest"
import "@testing-library/jest-dom"

// This mock will replace the real ResizeObserver with an empty mock that has the same interface but doesn’t do anything. This should prevent the error from occurring during testing.
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver
