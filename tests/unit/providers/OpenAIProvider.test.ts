import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OpenAIProvider } from '@/lib/providers/OpenAIProvider'
import type { OpenAIConfig } from '@/lib/providers/types'

describe('OpenAIProvider', () => {
  let provider: OpenAIProvider
  const mockConfig: OpenAIConfig = {
    type: 'openai',
    apiKey: 'sk-proj-testkey123',
    model: 'gpt-4o',
    maxTokens: 4096,
    temperature: 0.3,
  }

  beforeEach(() => {
    provider = new OpenAIProvider()
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

    it('should throw error with invalid API key format', async () => {
      const invalidConfig = { ...mockConfig, apiKey: 'invalid-key' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Invalid OpenAI API key format')
    })

    it('should throw error with unsupported model', async () => {
      const invalidConfig = { ...mockConfig, model: 'invalid-model' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Unsupported OpenAI model')
    })

    it('should accept all supported models', async () => {
      const supportedModels = [
        'gpt-4o',
        'gpt-4o-mini',
        'gpt-4-turbo',
        'gpt-4',
        'gpt-3.5-turbo',
      ]

      for (const model of supportedModels) {
        const config = { ...mockConfig, model }
        const testProvider = new OpenAIProvider()
        await testProvider.initialize(config)
        expect(testProvider.isConfigured()).toBe(true)
      }
    })
  })

  describe('getName', () => {
    it('should return provider name', () => {
      expect(provider.getName()).toBe('OpenAI')
    })
  })

  describe('getType', () => {
    it('should return provider type', () => {
      expect(provider.getType()).toBe('openai')
    })
  })

  describe('generateResponse', () => {
    beforeEach(async () => {
      await provider.initialize(mockConfig)
    })

    it('should generate response successfully', async () => {
      const mockResponse = 'This is a GPT-4o response'
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponse } }],
        }),
      })

      const response = await provider.generateResponse('Test prompt')
      expect(response).toBe(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.openai.com/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockConfig.apiKey}`,
          }),
        })
      )
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

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('OpenAI API error')
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Network error')
    })

    it('should throw if not configured', async () => {
      const unconfiguredProvider = new OpenAIProvider()
      await expect(unconfiguredProvider.generateResponse('Test')).rejects.toThrow('not configured')
    })

    it('should handle invalid response format', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [],
        }),
      })

      await expect(provider.generateResponse('Test')).rejects.toThrow('Invalid response format')
    })
  })

  describe('isConfigured', () => {
    it('should return false initially', () => {
      const newProvider = new OpenAIProvider()
      expect(newProvider.isConfigured()).toBe(false)
    })

    it('should return true after initialization', async () => {
      await provider.initialize(mockConfig)
      expect(provider.isConfigured()).toBe(true)
    })
  })
})
