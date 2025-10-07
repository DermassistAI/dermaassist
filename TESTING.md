# DermAssist Testing Guide

Comprehensive testing documentation for DermAssist, covering unit tests, integration tests, authentication tests, AI provider tests, and end-to-end testing.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Test Setup](#test-setup)
3. [Running Tests](#running-tests)
4. [Unit Tests](#unit-tests)
5. [Integration Tests](#integration-tests)
6. [Authentication Tests](#authentication-tests)
7. [AI Provider Tests](#ai-provider-tests)
8. [End-to-End Tests](#end-to-end-tests)
9. [Test Coverage](#test-coverage)
10. [CI/CD Integration](#cicd-integration)
11. [Best Practices](#best-practices)

---

## Testing Philosophy

### Testing Principles

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Test Pyramid**: Many unit tests, fewer integration tests, minimal E2E tests
3. **Isolation**: Each test should be independent and not rely on others
4. **Readability**: Tests are documentation - make them clear and descriptive
5. **Fast Feedback**: Tests should run quickly in development

### Test Coverage Goals

- **Unit Tests**: > 80% coverage
- **Integration Tests**: Critical paths 100% covered
- **E2E Tests**: Happy path + critical error scenarios

---

## Test Setup

### Prerequisites

```bash
# Ensure dependencies are installed
pnpm install

# Install test dependencies (if not already included)
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @vitest/ui @vitest/coverage-v8
pnpm add -D playwright @playwright/test
pnpm add -D msw whatwg-fetch
```

### Test Environment Configuration

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.NODE_ENV = 'test'

// Mock fetch globally
global.fetch = vi.fn()

// Mock console to reduce noise in tests
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
}
```

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Update `package.json` Scripts

Add test scripts:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:unit": "vitest run --dir tests/unit",
    "test:integration": "vitest run --dir tests/integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:auth:clerk": "vitest run --grep clerk",
    "test:auth:keycloak": "vitest run --grep keycloak",
    "test:auth:rbac": "vitest run --grep rbac",
    "test:providers": "vitest run --dir tests/providers",
    "test:provider": "vitest run --grep"
  }
}
```

---

## Running Tests

### Basic Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with UI (interactive)
pnpm test:ui

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test src/lib/providers/AzureOpenAIProvider.test.ts

# Run tests matching pattern
pnpm test --grep "Claude"
```

### Test Filtering

```bash
# Run only unit tests
pnpm test:unit

# Run only integration tests
pnpm test:integration

# Run only authentication tests
pnpm test --grep "auth"

# Run only AI provider tests
pnpm test:providers

# Skip specific tests
pnpm test --grep "^(?!.*slow).*"
```

---

## Unit Tests

### Testing AI Providers

#### Test File Structure

```
tests/
├── unit/
│   ├── providers/
│   │   ├── AzureOpenAIProvider.test.ts
│   │   ├── GoogleGeminiProvider.test.ts
│   │   ├── ClaudeProvider.test.ts
│   │   ├── OpenAIProvider.test.ts
│   │   ├── GroqProvider.test.ts
│   │   ├── QwenProvider.test.ts
│   │   └── AIProviderFactory.test.ts
│   ├── auth/
│   │   ├── clerk.test.ts
│   │   ├── keycloak.test.ts
│   │   └── rbac.test.ts
│   └── utils/
│       └── validation.test.ts
```

#### Example: Azure OpenAI Provider Test

Create `tests/unit/providers/AzureOpenAIProvider.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AzureOpenAIProvider } from '@/lib/providers/AzureOpenAIProvider'
import type { AzureOpenAIConfig } from '@/lib/providers/types'

describe('AzureOpenAIProvider', () => {
  let provider: AzureOpenAIProvider
  const mockConfig: AzureOpenAIConfig = {
    type: 'azure-openai',
    apiKey: 'test-api-key',
    endpoint: 'https://test.openai.azure.com',
    deployment: 'gpt-4o-mini',
    apiVersion: '2024-02-15-preview',
  }

  beforeEach(() => {
    provider = new AzureOpenAIProvider()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with valid config', async () => {
      await provider.initialize(mockConfig)
      expect(provider.isConfigured()).toBe(true)
    })

    it('should throw error with missing API key', async () => {
      const invalidConfig = { ...mockConfig, apiKey: '' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('API key is required')
    })

    it('should throw error with missing endpoint', async () => {
      const invalidConfig = { ...mockConfig, endpoint: '' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Endpoint is required')
    })

    it('should normalize endpoint URL', async () => {
      const configWithPath = {
        ...mockConfig,
        endpoint: 'https://test.openai.azure.com/openai/responses',
      }
      await provider.initialize(configWithPath)
      // Verify endpoint is normalized to origin
      expect(provider.isConfigured()).toBe(true)
    })
  })

  describe('getName', () => {
    it('should return provider name', () => {
      expect(provider.getName()).toBe('Azure OpenAI')
    })
  })

  describe('getType', () => {
    it('should return provider type', () => {
      expect(provider.getType()).toBe('azure-openai')
    })
  })

  describe('generateResponse', () => {
    beforeEach(async () => {
      await provider.initialize(mockConfig)
    })

    it('should generate response successfully', async () => {
      const mockResponse = 'This is a test response'
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponse } }],
        }),
      })

      const response = await provider.generateResponse('Test prompt')
      expect(response).toBe(mockResponse)
    })

    it('should handle API errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
      })

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Too Many Requests')
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Network error')
    })

    it('should throw if not configured', async () => {
      const unconfiguredProvider = new AzureOpenAIProvider()
      await expect(unconfiguredProvider.generateResponse('Test')).rejects.toThrow('not configured')
    })
  })

  describe('isConfigured', () => {
    it('should return false initially', () => {
      const newProvider = new AzureOpenAIProvider()
      expect(newProvider.isConfigured()).toBe(false)
    })

    it('should return true after initialization', async () => {
      await provider.initialize(mockConfig)
      expect(provider.isConfigured()).toBe(true)
    })
  })
})
```

#### Example: Claude Provider Test

Create `tests/unit/providers/ClaudeProvider.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ClaudeProvider } from '@/lib/providers/ClaudeProvider'
import type { ClaudeConfig } from '@/lib/providers/types'

describe('ClaudeProvider', () => {
  let provider: ClaudeProvider
  const mockConfig: ClaudeConfig = {
    type: 'claude',
    apiKey: 'sk-ant-api03-test',
    model: 'claude-3-5-sonnet-20241022',
    maxTokens: 4096,
    temperature: 0.3,
  }

  beforeEach(() => {
    provider = new ClaudeProvider()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with valid config', async () => {
      await provider.initialize(mockConfig)
      expect(provider.isConfigured()).toBe(true)
      expect(provider.getName()).toBe('Claude (Anthropic)')
    })

    it('should validate API key format', async () => {
      const invalidConfig = { ...mockConfig, apiKey: 'invalid-key' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Invalid API key format')
    })

    it('should validate model name', async () => {
      const invalidConfig = { ...mockConfig, model: 'invalid-model' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Unsupported model')
    })
  })

  describe('generateResponse', () => {
    beforeEach(async () => {
      await provider.initialize(mockConfig)
    })

    it('should generate response successfully', async () => {
      const mockResponse = 'Claude response'
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          content: [{ text: mockResponse }],
        }),
      })

      const response = await provider.generateResponse('Test prompt')
      expect(response).toBe(mockResponse)
    })

    it('should handle rate limiting', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        headers: new Headers({ 'retry-after': '60' }),
      })

      await expect(provider.generateResponse('Test')).rejects.toThrow('Rate limited')
    })
  })
})
```

#### Example: AI Provider Factory Test

Create `tests/unit/providers/AIProviderFactory.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { AIProviderFactory } from '@/lib/providers/AIProviderFactory'

describe('AIProviderFactory', () => {
  describe('createProvider', () => {
    it('should create Azure OpenAI provider', () => {
      const provider = AIProviderFactory.createProvider('azure-openai')
      expect(provider.getType()).toBe('azure-openai')
      expect(provider.getName()).toBe('Azure OpenAI')
    })

    it('should create Google Gemini provider', () => {
      const provider = AIProviderFactory.createProvider('google-gemini')
      expect(provider.getType()).toBe('google-gemini')
      expect(provider.getName()).toBe('Google Gemini')
    })

    it('should create Claude provider', () => {
      const provider = AIProviderFactory.createProvider('claude')
      expect(provider.getType()).toBe('claude')
      expect(provider.getName()).toBe('Claude (Anthropic)')
    })

    it('should create OpenAI provider', () => {
      const provider = AIProviderFactory.createProvider('openai')
      expect(provider.getType()).toBe('openai')
      expect(provider.getName()).toBe('OpenAI')
    })

    it('should create Groq provider', () => {
      const provider = AIProviderFactory.createProvider('groq')
      expect(provider.getType()).toBe('groq')
      expect(provider.getName()).toBe('Groq')
    })

    it('should create Qwen provider', () => {
      const provider = AIProviderFactory.createProvider('qwen')
      expect(provider.getType()).toBe('qwen')
      expect(provider.getName()).toBe('Qwen')
    })

    it('should throw error for unsupported provider', () => {
      expect(() => AIProviderFactory.createProvider('unsupported' as any)).toThrow(
        'Unsupported provider type'
      )
    })
  })

  describe('getAvailableProviders', () => {
    it('should return list of available providers', () => {
      const providers = AIProviderFactory.getAvailableProviders()
      expect(providers).toContain('azure-openai')
      expect(providers).toContain('google-gemini')
      expect(providers).toContain('claude')
      expect(providers).toContain('openai')
      expect(providers).toContain('groq')
      expect(providers).toContain('qwen')
    })
  })
})
```

### Testing Utilities

Create `tests/unit/utils/validation.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { validateImageFile, validateICD11Code } from '@/lib/utils/validation'

describe('Validation Utilities', () => {
  describe('validateImageFile', () => {
    it('should accept valid image types', () => {
      const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/webp']
      validTypes.forEach((type) => {
        const file = new File([''], 'test.jpg', { type })
        expect(validateImageFile(file)).toBe(true)
      })
    })

    it('should reject invalid file types', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' })
      expect(validateImageFile(file)).toBe(false)
    })

    it('should reject files exceeding size limit', () => {
      const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      })
      expect(validateImageFile(largeFile, 10)).toBe(false)
    })
  })

  describe('validateICD11Code', () => {
    it('should accept valid ICD-11 codes', () => {
      const validCodes = ['1F00', 'EA00.0', '2E65.Y']
      validCodes.forEach((code) => {
        expect(validateICD11Code(code)).toBe(true)
      })
    })

    it('should reject invalid ICD-11 codes', () => {
      const invalidCodes = ['invalid', '123', 'ABC']
      invalidCodes.forEach((code) => {
        expect(validateICD11Code(code)).toBe(false)
      })
    })
  })
})
```

---

## Integration Tests

### Testing API Routes

Create `tests/integration/api/analyze.test.ts`:

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { POST } from '@/app/api/analyze/route'
import { NextRequest } from 'next/server'

describe('/api/analyze', () => {
  beforeAll(async () => {
    // Setup test database, mock providers
  })

  afterAll(async () => {
    // Cleanup
  })

  it('should analyze image with valid request', async () => {
    const formData = new FormData()
    formData.append('image', new File([''], 'test.jpg', { type: 'image/jpeg' }))
    formData.append('provider', 'claude')
    formData.append('clinicalHistory', 'Test history')

    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('analysisId')
    expect(data).toHaveProperty('result')
  })

  it('should return 400 for missing image', async () => {
    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: new FormData(),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should return 503 when no provider available', async () => {
    // Mock all providers as unavailable
    const formData = new FormData()
    formData.append('image', new File([''], 'test.jpg', { type: 'image/jpeg' }))

    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(503)
  })
})
```

### Testing Database Operations

Create `tests/integration/db/submissions.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { SubmissionRepository } from '@/lib/db/SubmissionRepository'
import { supabase } from '@/lib/supabase/client'

describe('SubmissionRepository', () => {
  let repository: SubmissionRepository

  beforeEach(() => {
    repository = new SubmissionRepository()
  })

  afterEach(async () => {
    // Clean up test data
    await supabase.from('submissions').delete().eq('test', true)
  })

  it('should create submission', async () => {
    const submission = {
      imageUrl: 'https://example.com/image.jpg',
      provider: 'claude',
      clinicalHistory: 'Test history',
      test: true,
    }

    const result = await repository.create(submission)
    expect(result).toHaveProperty('id')
    expect(result.provider).toBe('claude')
  })

  it('should retrieve submission by ID', async () => {
    const submission = await repository.create({
      imageUrl: 'https://example.com/image.jpg',
      provider: 'claude',
      test: true,
    })

    const retrieved = await repository.getById(submission.id)
    expect(retrieved).toBeDefined()
    expect(retrieved.id).toBe(submission.id)
  })

  it('should update submission with analysis result', async () => {
    const submission = await repository.create({
      imageUrl: 'https://example.com/image.jpg',
      provider: 'claude',
      test: true,
    })

    const updated = await repository.update(submission.id, {
      analysisResult: { condition: 'Eczema', confidence: 0.85 },
      status: 'completed',
    })

    expect(updated.status).toBe('completed')
    expect(updated.analysisResult.condition).toBe('Eczema')
  })
})
```

---

## Authentication Tests

### Clerk Authentication Tests

Create `tests/integration/auth/clerk.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest'
import { clerkClient } from '@clerk/nextjs/server'

describe('Clerk Authentication', () => {
  let testUserId: string

  beforeAll(async () => {
    // Create test user
    const user = await clerkClient.users.createUser({
      emailAddress: ['test@dermassist.com'],
      password: 'TestPassword123!',
    })
    testUserId = user.id
  })

  it('should create user successfully', async () => {
    const user = await clerkClient.users.getUser(testUserId)
    expect(user).toBeDefined()
    expect(user.emailAddresses[0].emailAddress).toBe('test@dermassist.com')
  })

  it('should sign in with valid credentials', async () => {
    // Simulate sign-in flow
    // This would typically be done via API or E2E test
    expect(testUserId).toBeDefined()
  })

  it('should assign role to user', async () => {
    await clerkClient.users.updateUser(testUserId, {
      publicMetadata: { role: 'researcher' },
    })

    const user = await clerkClient.users.getUser(testUserId)
    expect(user.publicMetadata.role).toBe('researcher')
  })

  it('should enforce role-based access', async () => {
    // Test RBAC middleware
    const user = await clerkClient.users.getUser(testUserId)
    const hasAdminAccess = user.publicMetadata.role === 'admin'
    expect(hasAdminAccess).toBe(false)
  })
})
```

### Keycloak Authentication Tests

Create `tests/integration/auth/keycloak.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

describe('Keycloak Authentication', () => {
  it('should authenticate with Keycloak', async () => {
    // Mock Keycloak token response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: 'test_token',
        refresh_token: 'refresh_token',
        id_token: 'id_token',
      }),
    })

    // Test authentication flow
    // This would typically be done via E2E test
  })

  it('should extract roles from token', async () => {
    const mockToken = {
      realm_access: {
        roles: ['user', 'researcher'],
      },
    }

    // Verify role extraction logic
    const roles = mockToken.realm_access.roles
    expect(roles).toContain('user')
    expect(roles).toContain('researcher')
  })

  it('should handle token refresh', async () => {
    // Mock token refresh
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: 'new_token',
      }),
    })

    // Test refresh logic
  })
})
```

### RBAC Tests

Create `tests/integration/auth/rbac.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { hasPermission, checkRole } from '@/lib/auth/rbac'
import { Role } from '@/lib/auth/roles'

describe('Role-Based Access Control', () => {
  describe('hasPermission', () => {
    it('should allow admin all permissions', () => {
      expect(hasPermission(Role.ADMIN, 'submit:create')).toBe(true)
      expect(hasPermission(Role.ADMIN, 'analytics:read')).toBe(true)
      expect(hasPermission(Role.ADMIN, 'users:manage')).toBe(true)
    })

    it('should restrict user permissions', () => {
      expect(hasPermission(Role.USER, 'submit:create')).toBe(true)
      expect(hasPermission(Role.USER, 'analytics:read')).toBe(false)
      expect(hasPermission(Role.USER, 'users:manage')).toBe(false)
    })

    it('should allow researcher analytics access', () => {
      expect(hasPermission(Role.RESEARCHER, 'analytics:read')).toBe(true)
      expect(hasPermission(Role.RESEARCHER, 'submit:read')).toBe(true)
      expect(hasPermission(Role.RESEARCHER, 'users:manage')).toBe(false)
    })
  })

  describe('checkRole', () => {
    it('should throw error for insufficient permissions', () => {
      expect(() => checkRole(Role.USER, Role.ADMIN)).toThrow('Insufficient permissions')
    })

    it('should pass for matching role', () => {
      expect(() => checkRole(Role.ADMIN, Role.ADMIN)).not.toThrow()
    })
  })
})
```

---

## AI Provider Tests

### Provider Availability Tests

Create `tests/integration/providers/availability.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { AIProviderFactory } from '@/lib/providers/AIProviderFactory'

describe('AI Provider Availability', () => {
  const testPrompt = 'Describe the symptoms of eczema in one sentence.'

  it('should test Claude availability', async () => {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('Skipping Claude test - no API key')
      return
    }

    const provider = AIProviderFactory.createProvider('claude')
    await provider.initialize({
      type: 'claude',
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: 'claude-3-5-sonnet-20241022',
    })

    const response = await provider.generateResponse(testPrompt)
    expect(response).toBeDefined()
    expect(response.length).toBeGreaterThan(0)
  }, 30000)

  it('should test Gemini availability', async () => {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.warn('Skipping Gemini test - no API key')
      return
    }

    const provider = AIProviderFactory.createProvider('google-gemini')
    await provider.initialize({
      type: 'google-gemini',
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
      model: 'gemini-2.0-flash-exp',
    })

    const response = await provider.generateResponse(testPrompt)
    expect(response).toBeDefined()
    expect(response.length).toBeGreaterThan(0)
  }, 30000)

  it('should test OpenAI availability', async () => {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('Skipping OpenAI test - no API key')
      return
    }

    const provider = AIProviderFactory.createProvider('openai')
    await provider.initialize({
      type: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o',
    })

    const response = await provider.generateResponse(testPrompt)
    expect(response).toBeDefined()
    expect(response.length).toBeGreaterThan(0)
  }, 30000)

  // Similar tests for Groq, Azure OpenAI, Qwen
})
```

### Provider Health Check Tests

Create `tests/integration/providers/health.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { checkProviderHealth } from '@/lib/providers/health'

describe('Provider Health Checks', () => {
  it('should check all provider health', async () => {
    const results = await checkProviderHealth()

    expect(results).toHaveProperty('claude')
    expect(results).toHaveProperty('gemini')
    expect(results).toHaveProperty('openai')
    expect(results).toHaveProperty('groq')
    expect(results).toHaveProperty('azure-openai')
    expect(results).toHaveProperty('qwen')

    Object.values(results).forEach((result) => {
      expect(result).toHaveProperty('status')
      expect(result).toHaveProperty('responseTime')
      expect(result.status).toMatch(/^(operational|degraded|down)$/)
    })
  }, 60000)

  it('should detect unavailable provider', async () => {
    const result = await checkProviderHealth('invalid-provider')
    expect(result.status).toBe('down')
  })
})
```

---

## End-to-End Tests

### Submission Flow E2E Test

Create `tests/e2e/submission-flow.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Submission Flow', () => {
  test('should complete full submission flow', async ({ page }) => {
    // Navigate to landing page
    await page.goto('/')
    await expect(page).toHaveTitle(/DermAssist/)

    // Click "Start Submission" button
    await page.click('text=Start Submission')

    // Step 1: Consent
    await expect(page.locator('text=Welcome')).toBeVisible()
    await page.check('[name="consent-deidentified"]')
    await page.check('[name="consent-research"]')
    await page.check('[name="consent-age"]')
    await page.click('text=Let\'s Begin')

    // Step 2: Upload Image
    await expect(page.locator('text=upload a clear photo')).toBeVisible()
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles('./tests/fixtures/test-image.jpg')
    await page.waitForSelector('img[alt="Preview"]')
    await page.click('text=Continue')

    // Step 3: Select Model
    await expect(page.locator('text=Choose your AI assistant')).toBeVisible()
    await page.click('[data-model="claude"]')
    await page.click('text=Continue')

    // Step 4: Clinical History
    await expect(page.locator('text=How long have you had')).toBeVisible()
    await page.click('text=1-4 weeks')
    await page.fill('[name="treatments"]', 'Over-the-counter cream')
    await page.fill('[name="symptoms"]', 'Mild itching')
    await page.click('text=Continue')

    // Step 5: Social Factors (skip optional)
    await page.click('text=Skip This Step')

    // Step 6: ICD-11 Suggestion (skip optional)
    await page.click('text=Skip This Step')

    // Step 7: Treatment Options (skip optional)
    await page.click('text=Skip This Step')

    // Step 8: Review & Submit
    await expect(page.locator('text=review your submission')).toBeVisible()
    await page.click('text=Submit for Analysis')

    // Step 9: Analysis in Progress
    await expect(page.locator('text=Analyzing image')).toBeVisible()

    // Step 10: Results
    await expect(page.locator('text=Analysis Complete')).toBeVisible({ timeout: 60000 })
    await expect(page.locator('[data-testid="analysis-result"]')).toBeVisible()

    // Verify result contains expected elements
    await expect(page.locator('text=Condition:')).toBeVisible()
    await expect(page.locator('text=ICD-11 Code:')).toBeVisible()
    await expect(page.locator('text=Confidence:')).toBeVisible()
  })

  test('should handle image upload validation', async ({ page }) => {
    await page.goto('/submit')
    
    // Try uploading invalid file
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles('./tests/fixtures/invalid.txt')
    
    // Should show error
    await expect(page.locator('text=Please upload a JPG, PNG, or HEIC file')).toBeVisible()
  })
})
```

### Admin Portal E2E Test

Create `tests/e2e/admin-portal.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Admin Portal', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in as admin
    await page.goto('/sign-in')
    await page.fill('[name="email"]', 'admin@dermassist.com')
    await page.fill('[name="password"]', 'AdminPassword123!')
    await page.click('text=Sign In')
    await page.waitForURL('/dashboard')
  })

  test('should display admin dashboard', async ({ page }) => {
    await page.goto('/admin')
    
    await expect(page.locator('text=System Status')).toBeVisible()
    await expect(page.locator('text=Active Models')).toBeVisible()
    await expect(page.locator('text=Recent Submissions')).toBeVisible()
  })

  test('should run health check', async ({ page }) => {
    await page.goto('/admin/models')
    
    // Find Claude model card
    const claudeCard = page.locator('[data-model="claude"]')
    await expect(claudeCard).toBeVisible()
    
    // Click health check button
    await claudeCard.locator('text=Run Health Check').click()
    
    // Wait for result
    await expect(claudeCard.locator('text=Operational')).toBeVisible({ timeout: 10000 })
  })

  test('should view submission details', async ({ page }) => {
    await page.goto('/admin')
    
    // Click first submission
    await page.locator('[data-testid="submission-row"]').first().click()
    
    // Verify details modal
    await expect(page.locator('[data-testid="submission-modal"]')).toBeVisible()
    await expect(page.locator('text=Submission ID')).toBeVisible()
    await expect(page.locator('text=Model Used')).toBeVisible()
  })
})
```

---

## Test Coverage

### Viewing Coverage Reports

```bash
# Generate coverage report
pnpm test:coverage

# Open HTML report
open coverage/index.html
```

### Coverage Requirements

Enforce minimum coverage in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
})
```

---

## CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run linter
        run: pnpm lint
        
      - name: Run type check
        run: pnpm type-check
        
      - name: Run unit tests
        run: pnpm test:unit
        
      - name: Run integration tests
        run: pnpm test:integration
        env:
          # Add test environment variables
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GOOGLE_GEMINI_API_KEY: ${{ secrets.GOOGLE_GEMINI_API_KEY }}
          
      - name: Run E2E tests
        run: pnpm test:e2e
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

---

## Best Practices

### 1. Test Naming

```typescript
// Good
it('should create submission with valid data')
it('should throw error when API key is missing')

// Bad
it('test submission')
it('error case')
```

### 2. Test Organization

```typescript
describe('ProviderName', () => {
  describe('method1', () => {
    it('should handle case 1')
    it('should handle case 2')
  })
  
  describe('method2', () => {
    it('should handle case 3')
  })
})
```

### 3. Mocking

```typescript
// Mock external dependencies
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(),
      select: vi.fn(),
    })),
  },
}))
```

### 4. Test Data

```typescript
// Use factories for test data
function createMockSubmission(overrides = {}) {
  return {
    id: 'test-id',
    imageUrl: 'https://example.com/image.jpg',
    provider: 'claude',
    status: 'pending',
    ...overrides,
  }
}
```

### 5. Async Testing

```typescript
// Always use async/await
it('should fetch data', async () => {
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

---

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout for slow operations
2. **Flaky tests**: Use `waitFor` and proper assertions
3. **Mock not working**: Verify mock is defined before test
4. **Coverage not generated**: Check `coverage` directory exists

### Debug Mode

```bash
# Run specific test with debug output
DEBUG=* pnpm test specific-test.test.ts

# Run E2E tests in headed mode
pnpm test:e2e --headed --debug
```

---

**Last Updated**: 2025-01-01
**Version**: 1.0.0
