/**
 * Azure OpenAI Provider Implementation
 * Extends BaseAIProvider following Liskov Substitution Principle (LSP)
 */

import { ai, type AxAIService } from '@ax-llm/ax';
import { BaseAIProvider } from './BaseAIProvider';
import type { AzureOpenAIConfig, ProviderType } from './types';
import { callModelText } from '../axHelpers';

export class AzureOpenAIProvider extends BaseAIProvider {
  protected async createClient(): Promise<void> {
    const config = this.getConfig() as AzureOpenAIConfig;

    // Extract resource name from endpoint
    let resourceName: string | undefined;
    try {
      const url = new URL(config.endpoint);
      const host = url.hostname;
      const parts = host.split('.');
      if (parts.length > 0) resourceName = parts[0];
    } catch (e) {
      // ignore invalid URL
    }

    this.client = ai({
      name: 'azure-openai',
      apiKey: config.apiKey,
      resourceName,
      deploymentName: config.deployment,
      version: config.apiVersion ?? '2024-02-15-preview',
    } as any);
  }

  async generateResponse(prompt: string): Promise<string> {
    const client = this.getClient() as AxAIService;
    return await callModelText(client, prompt);
  }

  getName(): string {
    return 'Azure OpenAI';
  }

  getType(): ProviderType {
    return 'azure-openai';
  }
}
