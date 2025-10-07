/**
 * Provider Factory
 * Implements Factory Pattern and Dependency Inversion Principle (DIP)
 * High-level modules depend on IAIProvider abstraction, not concrete implementations
 */

import type { IAIProvider, ProviderConfig, ProviderType } from './types';
import { AzureOpenAIProvider } from './AzureOpenAIProvider';
import { GoogleGeminiProvider } from './GoogleGeminiProvider';
import { GroqProvider } from './GroqProvider';

export class AIProviderFactory {
  /**
   * Create a provider instance based on configuration
   * Following Factory Pattern - centralized object creation
   */
  static createProvider(config: ProviderConfig): IAIProvider {
    switch (config.type) {
      case 'azure-openai':
        return new AzureOpenAIProvider();
      case 'google-gemini':
        return new GoogleGeminiProvider();
      case 'groq':
        return new GroqProvider();
      default:
        throw new Error(`Unknown provider type: ${(config as any).type}`);
    }
  }

  /**
   * Create and initialize a provider in one step
   */
  static async createAndInitialize(config: ProviderConfig): Promise<IAIProvider> {
    const provider = this.createProvider(config);
    await provider.initialize(config);
    return provider;
  }

  /**
   * Get a provider instance by type (useful for dependency injection)
   */
  static getProviderByType(type: ProviderType): new () => IAIProvider {
    switch (type) {
      case 'azure-openai':
        return AzureOpenAIProvider as any;
      case 'google-gemini':
        return GoogleGeminiProvider as any;
      case 'groq':
        return GroqProvider as any;
      default:
        throw new Error(`Unknown provider type: ${type}`);
    }
  }
}
