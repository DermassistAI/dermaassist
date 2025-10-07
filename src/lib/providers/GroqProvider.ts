/**
 * Groq Provider Implementation
 * Extends BaseAIProvider following Liskov Substitution Principle (LSP)
 */

import { ai, type AxAIService } from '@ax-llm/ax';
import { BaseAIProvider } from './BaseAIProvider';
import type { GroqConfig, ProviderType } from './types';
import { callModelText } from '../axHelpers';

export class GroqProvider extends BaseAIProvider {
  protected async createClient(): Promise<void> {
    const config = this.getConfig() as GroqConfig;

    // Initialize Groq provider with ax-llm
    // According to ax-llm docs, use 'groq' as the provider name
    this.client = ai({
      name: 'groq',
      apiKey: config.apiKey,
      model: config.model,
    } as any);
  }

  async generateResponse(prompt: string): Promise<string> {
    const client = this.getClient() as AxAIService;
    return await callModelText(client, prompt);
  }

  getName(): string {
    return 'Groq';
  }

  getType(): ProviderType {
    return 'groq';
  }
}
