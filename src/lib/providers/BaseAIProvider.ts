/**
 * Base abstract provider class
 * Implements common functionality for all AI providers
 * Following Open/Closed Principle (OCP) - open for extension, closed for modification
 */

import type { IAIProvider, ProviderConfig, ProviderType } from './types';

export abstract class BaseAIProvider implements IAIProvider {
  protected config: ProviderConfig | null = null;
  protected client: unknown = null;

  async initialize(config: ProviderConfig): Promise<void> {
    this.config = config;
    await this.createClient();
  }

  /**
   * Abstract method to be implemented by each provider
   * Template Method Pattern - subclasses define specific client creation
   */
  protected abstract createClient(): Promise<void>;

  abstract generateResponse(prompt: string): Promise<string>;
  abstract getName(): string;
  abstract getType(): ProviderType;

  isConfigured(): boolean {
    return this.config !== null && this.client !== null;
  }

  protected getConfig(): ProviderConfig {
    if (!this.config) {
      throw new Error(`${this.getName()} provider is not configured`);
    }
    return this.config;
  }

  protected getClient(): unknown {
    if (!this.client) {
      throw new Error(`${this.getName()} provider client is not initialized`);
    }
    return this.client;
  }
}
