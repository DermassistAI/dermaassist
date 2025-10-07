/**
 * Qwen AI Provider
 * Implements the IAIProvider interface for Qwen models (Alibaba Cloud)
 * Following SOLID principles - specifically SRP and LSP
 */

import { BaseAIProvider } from './BaseAIProvider';
import type { QwenConfig, ProviderType } from './types';

export class QwenProvider extends BaseAIProvider {
  private qwenClient: any = null;

  getName(): string {
    return 'Qwen';
  }

  getType(): ProviderType {
    return 'qwen';
  }

  protected async createClient(): Promise<void> {
    const config = this.getConfig() as QwenConfig;

    // Validate configuration
    if (!config.apiKey) {
      throw new Error('Qwen API key is required. Set QWEN_API_KEY environment variable.');
    }

    // Validate model
    const supportedModels = [
      'qwen-max',
      'qwen-plus',
      'qwen-turbo',
      'qwen-max-longcontext',
    ];

    if (!supportedModels.includes(config.model)) {
      throw new Error(
        `Unsupported Qwen model: ${config.model}. Supported models: ${supportedModels.join(', ')}`
      );
    }

    // Default endpoint for Alibaba Cloud DashScope
    const endpoint = config.endpoint || 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

    // Store config for later use
    this.qwenClient = {
      apiKey: config.apiKey,
      model: config.model,
      endpoint: endpoint,
      maxTokens: config.maxTokens || 4096,
      temperature: config.temperature !== undefined ? config.temperature : 0.3,
    };

    this.client = this.qwenClient;
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Qwen provider is not configured. Call initialize() first.');
    }

    const client = this.qwenClient;

    try {
      const response = await fetch(client.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${client.apiKey}`,
        },
        body: JSON.stringify({
          model: client.model,
          input: {
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
          },
          parameters: {
            max_tokens: client.maxTokens,
            temperature: client.temperature,
            result_format: 'message',
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          throw new Error('Rate limited. Please try again later.');
        }
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Qwen API key.');
        }
        throw new Error(`Qwen API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      // Qwen API response format
      if (data.output && data.output.choices && Array.isArray(data.output.choices) && data.output.choices.length > 0) {
        return data.output.choices[0].message.content;
      }

      // Alternative response format
      if (data.output && data.output.text) {
        return data.output.text;
      }

      throw new Error('Invalid response format from Qwen API');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while calling Qwen API');
    }
  }
}
