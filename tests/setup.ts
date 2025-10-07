import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables for testing
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

// Mock fetch globally
global.fetch = vi.fn()

// Suppress console errors and warnings in tests to reduce noise
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = vi.fn((...args) => {
    // Still log actual errors but suppress React/testing library warnings
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') ||
        args[0].includes('Not implemented:') ||
        args[0].includes('Error: Could not parse CSS'))
    ) {
      return
    }
    originalError(...args)
  })

  console.warn = vi.fn((...args) => {
    // Suppress common warnings
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) {
      return
    }
    originalWarn(...args)
  })
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
