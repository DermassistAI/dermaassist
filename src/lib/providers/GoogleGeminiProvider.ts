/**
 * Google Gemini Provider Implementation
 * Extends BaseAIProvider following Liskov Substitution Principle (LSP)
 */

import { ai, type AxAIService } from '@ax-llm/ax';
import { BaseAIProvider } from './BaseAIProvider';
import type { GoogleGeminiConfig, ProviderType } from './types';
import { callModelText } from '../axHelpers';

export class GoogleGeminiProvider extends BaseAIProvider {
  protected async createClient(): Promise<void> {
    const config = this.getConfig() as GoogleGeminiConfig;

    // Initialize Google Gemini provider with ax-llm
    // According to ax-llm docs, use 'google-gemini' as the provider name
    this.client = ai({
      name: 'google-gemini',
      apiKey: config.apiKey,
      model: config.model,
    } as any);
  }

  async generateResponse(prompt: string): Promise<string> {
    const client = this.getClient() as AxAIService;
    return await callModelText(client, prompt);
  }

  getName(): string {
    return 'Google Gemini';
  }

  getType(): ProviderType {
    return 'google-gemini';
  }
}
