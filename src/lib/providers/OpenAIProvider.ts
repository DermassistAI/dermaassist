/**
 * OpenAI AI Provider
 * Implements the IAIProvider interface for OpenAI models (GPT-4o, GPT-4o-mini, etc.)
 * Following SOLID principles - specifically SRP and LSP
 */

import { BaseAIProvider } from './BaseAIProvider';
import type { OpenAIConfig, ProviderType } from './types';

export class OpenAIProvider extends BaseAIProvider {
  private openaiClient: any = null;

  getName(): string {
    return 'OpenAI';
  }

  getType(): ProviderType {
    return 'openai';
  }

  protected async createClient(): Promise<void> {
    const config = this.getConfig() as OpenAIConfig;

    // Validate configuration
    if (!config.apiKey) {
      throw new Error('OpenAI API key is required. Set OPENAI_API_KEY environment variable.');
    }

    if (!config.apiKey.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format. Key should start with "sk-"');
    }

    // Validate model
    const supportedModels = [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-4',
      'gpt-3.5-turbo',
    ];

    if (!supportedModels.includes(config.model)) {
      throw new Error(
        `Unsupported OpenAI model: ${config.model}. Supported models: ${supportedModels.join(', ')}`
      );
    }

    // Store config for later use
    this.openaiClient = {
      apiKey: config.apiKey,
      model: config.model,
      maxTokens: config.maxTokens || 4096,
      temperature: config.temperature !== undefined ? config.temperature : 0.3,
    };

    this.client = this.openaiClient;
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI provider is not configured. Call initialize() first.');
    }

    const client = this.openaiClient;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${client.apiKey}`,
        },
        body: JSON.stringify({
          model: client.model,
          max_tokens: client.maxTokens,
          temperature: client.temperature,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          throw new Error('Rate limited. Please try again later.');
        }
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key.');
        }
        throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      // OpenAI returns choices array
      if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
        return data.choices[0].message.content;
      }

      throw new Error('Invalid response format from OpenAI API');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while calling OpenAI API');
    }
  }
}
