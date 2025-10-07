/**
 * Claude (Anthropic) AI Provider
 * Implements the IAIProvider interface for Claude models
 * Following SOLID principles - specifically SRP and LSP
 */

import { BaseAIProvider } from './BaseAIProvider';
import type { ClaudeConfig, ProviderType } from './types';

export class ClaudeProvider extends BaseAIProvider {
  private anthropicClient: any = null;

  getName(): string {
    return 'Claude (Anthropic)';
  }

  getType(): ProviderType {
    return 'claude';
  }

  protected async createClient(): Promise<void> {
    const config = this.getConfig() as ClaudeConfig;

    // Validate configuration
    if (!config.apiKey) {
      throw new Error('Claude API key is required. Set ANTHROPIC_API_KEY environment variable.');
    }

    if (!config.apiKey.startsWith('sk-ant-')) {
      throw new Error('Invalid Claude API key format. Key should start with "sk-ant-"');
    }

    // Validate model
    const supportedModels = [
      'claude-3-5-sonnet-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307',
    ];

    if (!supportedModels.includes(config.model)) {
      throw new Error(
        `Unsupported Claude model: ${config.model}. Supported models: ${supportedModels.join(', ')}`
      );
    }

    // Store config for later use
    this.anthropicClient = {
      apiKey: config.apiKey,
      model: config.model,
      maxTokens: config.maxTokens || 4096,
      temperature: config.temperature !== undefined ? config.temperature : 0.3,
    };

    this.client = this.anthropicClient;
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Claude provider is not configured. Call initialize() first.');
    }

    const client = this.anthropicClient;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': client.apiKey,
          'anthropic-version': '2023-06-01',
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
          const retryAfter = response.headers.get('retry-after');
          throw new Error(`Rate limited. Retry after ${retryAfter || 'unknown'} seconds.`);
        }
        throw new Error(`Claude API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      // Claude returns content as an array of content blocks
      if (data.content && Array.isArray(data.content) && data.content.length > 0) {
        return data.content[0].text;
      }

      throw new Error('Invalid response format from Claude API');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while calling Claude API');
    }
  }
}
