import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QwenProvider } from '@/lib/providers/QwenProvider'
import type { QwenConfig } from '@/lib/providers/types'

describe('QwenProvider', () => {
  let provider: QwenProvider
  const mockConfig: QwenConfig = {
    type: 'qwen',
    apiKey: 'test-qwen-key',
    model: 'qwen-max',
    maxTokens: 4096,
    temperature: 0.3,
  }

  beforeEach(() => {
    provider = new QwenProvider()
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

    it('should throw error with unsupported model', async () => {
      const invalidConfig = { ...mockConfig, model: 'invalid-model' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Unsupported Qwen model')
    })

    it('should accept all supported models', async () => {
      const supportedModels = [
        'qwen-max',
        'qwen-plus',
        'qwen-turbo',
        'qwen-max-longcontext',
      ]

      for (const model of supportedModels) {
        const config = { ...mockConfig, model }
        const testProvider = new QwenProvider()
        await testProvider.initialize(config)
        expect(testProvider.isConfigured()).toBe(true)
      }
    })

    it('should use custom endpoint if provided', async () => {
      const configWithEndpoint = {
        ...mockConfig,
        endpoint: 'https://custom.endpoint.com/api/v1',
      }
      await provider.initialize(configWithEndpoint)
      expect(provider.isConfigured()).toBe(true)
    })
  })

  describe('getName', () => {
    it('should return provider name', () => {
      expect(provider.getName()).toBe('Qwen')
    })
  })

  describe('getType', () => {
    it('should return provider type', () => {
      expect(provider.getType()).toBe('qwen')
    })
  })

  describe('generateResponse', () => {
    beforeEach(async () => {
      await provider.initialize(mockConfig)
    })

    it('should generate response successfully with message format', async () => {
      const mockResponse = 'This is a Qwen response'
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          output: {
            choices: [{ message: { content: mockResponse } }],
          },
        }),
      })

      const response = await provider.generateResponse('Test prompt')
      expect(response).toBe(mockResponse)
    })

    it('should generate response successfully with text format', async () => {
      const mockResponse = 'This is a Qwen text response'
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          output: {
            text: mockResponse,
          },
        }),
      })

      const response = await provider.generateResponse('Test prompt')
      expect(response).toBe(mockResponse)
    })

    it('should handle rate limiting', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        text: async () => 'Rate limit exceeded',
      })

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Rate limited')
    })

    it('should handle authentication errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => 'Invalid authentication',
      })

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Invalid API key')
    })

    it('should handle API errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal server error',
      })

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Qwen API error')
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Network error')
    })

    it('should throw if not configured', async () => {
      const unconfiguredProvider = new QwenProvider()
      await expect(unconfiguredProvider.generateResponse('Test')).rejects.toThrow('not configured')
    })

    it('should handle invalid response format', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          output: {},
        }),
      })

      await expect(provider.generateResponse('Test')).rejects.toThrow('Invalid response format')
    })
  })

  describe('isConfigured', () => {
    it('should return false initially', () => {
      const newProvider = new QwenProvider()
      expect(newProvider.isConfigured()).toBe(false)
    })

    it('should return true after initialization', async () => {
      await provider.initialize(mockConfig)
      expect(provider.isConfigured()).toBe(true)
    })
  })
})
