import { describe, it, expect } from 'vitest'
import { AIProviderFactory } from '@/lib/providers/AIProviderFactory'
import { ClaudeProvider } from '@/lib/providers/ClaudeProvider'
import { OpenAIProvider } from '@/lib/providers/OpenAIProvider'
import { QwenProvider } from '@/lib/providers/QwenProvider'

describe('AIProviderFactory', () => {
  describe('createProvider', () => {
    it('should create Azure OpenAI provider', () => {
      const config = {
        type: 'azure-openai' as const,
        apiKey: 'test-key',
        endpoint: 'https://test.openai.azure.com',
        deployment: 'gpt-4o-mini',
      }
      const provider = AIProviderFactory.createProvider(config)
      expect(provider.getType()).toBe('azure-openai')
      expect(provider.getName()).toBe('Azure OpenAI')
    })

    it('should create Google Gemini provider', () => {
      const config = {
        type: 'google-gemini' as const,
        apiKey: 'test-key',
        model: 'gemini-2.0-flash-exp',
      }
      const provider = AIProviderFactory.createProvider(config)
      expect(provider.getType()).toBe('google-gemini')
      expect(provider.getName()).toBe('Google Gemini')
    })

    it('should create Groq provider', () => {
      const config = {
        type: 'groq' as const,
        apiKey: 'test-key',
        model: 'llama-3.3-70b-versatile',
      }
      const provider = AIProviderFactory.createProvider(config)
      expect(provider.getType()).toBe('groq')
      expect(provider.getName()).toBe('Groq')
    })

    it('should create Claude provider', () => {
      const config = {
        type: 'claude' as const,
        apiKey: 'sk-ant-test',
        model: 'claude-3-5-sonnet-20241022',
      }
      const provider = AIProviderFactory.createProvider(config)
      expect(provider.getType()).toBe('claude')
      expect(provider.getName()).toBe('Claude (Anthropic)')
      expect(provider).toBeInstanceOf(ClaudeProvider)
    })

    it('should create OpenAI provider', () => {
      const config = {
        type: 'openai' as const,
        apiKey: 'sk-test',
        model: 'gpt-4o',
      }
      const provider = AIProviderFactory.createProvider(config)
      expect(provider.getType()).toBe('openai')
      expect(provider.getName()).toBe('OpenAI')
      expect(provider).toBeInstanceOf(OpenAIProvider)
    })

    it('should create Qwen provider', () => {
      const config = {
        type: 'qwen' as const,
        apiKey: 'test-key',
        model: 'qwen-max',
      }
      const provider = AIProviderFactory.createProvider(config)
      expect(provider.getType()).toBe('qwen')
      expect(provider.getName()).toBe('Qwen')
      expect(provider).toBeInstanceOf(QwenProvider)
    })

    it('should throw error for unsupported provider', () => {
      const config = {
        type: 'unsupported' as any,
        apiKey: 'test-key',
      }
      expect(() => AIProviderFactory.createProvider(config)).toThrow('Unknown provider type')
    })
  })

  describe('createAndInitialize', () => {
    it('should create and initialize provider', async () => {
      const config = {
        type: 'claude' as const,
        apiKey: 'sk-ant-api03-test',
        model: 'claude-3-5-sonnet-20241022',
      }
      const provider = await AIProviderFactory.createAndInitialize(config)
      expect(provider.isConfigured()).toBe(true)
    })
  })

  describe('getAvailableProviders', () => {
    it('should return list of all available providers', () => {
      const providers = AIProviderFactory.getAvailableProviders()
      expect(providers).toContain('azure-openai')
      expect(providers).toContain('google-gemini')
      expect(providers).toContain('groq')
      expect(providers).toContain('claude')
      expect(providers).toContain('openai')
      expect(providers).toContain('qwen')
      expect(providers).toHaveLength(6)
    })
  })
})
