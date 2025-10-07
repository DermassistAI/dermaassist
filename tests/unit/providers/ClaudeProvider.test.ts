import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ClaudeProvider } from '@/lib/providers/ClaudeProvider'
import type { ClaudeConfig } from '@/lib/providers/types'

describe('ClaudeProvider', () => {
  let provider: ClaudeProvider
  const mockConfig: ClaudeConfig = {
    type: 'claude',
    apiKey: 'sk-ant-api03-testkey123',
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
    })

    it('should throw error with missing API key', async () => {
      const invalidConfig = { ...mockConfig, apiKey: '' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('API key is required')
    })

    it('should throw error with invalid API key format', async () => {
      const invalidConfig = { ...mockConfig, apiKey: 'invalid-key' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Invalid Claude API key format')
    })

    it('should throw error with unsupported model', async () => {
      const invalidConfig = { ...mockConfig, model: 'invalid-model' }
      await expect(provider.initialize(invalidConfig)).rejects.toThrow('Unsupported Claude model')
    })

    it('should accept all supported models', async () => {
      const supportedModels = [
        'claude-3-5-sonnet-20241022',
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307',
      ]

      for (const model of supportedModels) {
        const config = { ...mockConfig, model }
        const testProvider = new ClaudeProvider()
        await testProvider.initialize(config)
        expect(testProvider.isConfigured()).toBe(true)
      }
    })
  })

  describe('getName', () => {
    it('should return provider name', () => {
      expect(provider.getName()).toBe('Claude (Anthropic)')
    })
  })

  describe('getType', () => {
    it('should return provider type', () => {
      expect(provider.getType()).toBe('claude')
    })
  })

  describe('generateResponse', () => {
    beforeEach(async () => {
      await provider.initialize(mockConfig)
    })

    it('should generate response successfully', async () => {
      const mockResponse = 'This is a Claude response'
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          content: [{ text: mockResponse }],
        }),
      })

      const response = await provider.generateResponse('Test prompt')
      expect(response).toBe(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.anthropic.com/v1/messages',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'x-api-key': mockConfig.apiKey,
            'anthropic-version': '2023-06-01',
          }),
        })
      )
    })

    it('should handle rate limiting', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        headers: new Map([['retry-after', '60']]),
        text: async () => 'Rate limit exceeded',
      })

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Rate limited')
    })

    it('should handle API errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal server error',
      })

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Claude API error')
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(provider.generateResponse('Test prompt')).rejects.toThrow('Network error')
    })

    it('should throw if not configured', async () => {
      const unconfiguredProvider = new ClaudeProvider()
      await expect(unconfiguredProvider.generateResponse('Test')).rejects.toThrow('not configured')
    })

    it('should handle invalid response format', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          content: [],
        }),
      })

      await expect(provider.generateResponse('Test')).rejects.toThrow('Invalid response format')
    })
  })

  describe('isConfigured', () => {
    it('should return false initially', () => {
      const newProvider = new ClaudeProvider()
      expect(newProvider.isConfigured()).toBe(false)
    })

    it('should return true after initialization', async () => {
      await provider.initialize(mockConfig)
      expect(provider.isConfigured()).toBe(true)
    })
  })
})
