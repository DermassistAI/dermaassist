/**
 * Type definitions for AI provider abstraction layer
 * Following Interface Segregation Principle (ISP) - focused, specific interfaces
 */

export type ProviderType = 'azure-openai' | 'google-gemini' | 'groq';

/**
 * Base configuration for all AI providers
 */
export interface BaseProviderConfig {
  type: ProviderType;
  apiKey: string;
}

/**
 * Azure OpenAI specific configuration
 */
export interface AzureOpenAIConfig extends BaseProviderConfig {
  type: 'azure-openai';
  endpoint: string;
  deployment: string;
  apiVersion?: string;
}

/**
 * Google Gemini specific configuration
 */
export interface GoogleGeminiConfig extends BaseProviderConfig {
  type: 'google-gemini';
  model: string; // e.g., 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'
}

/**
 * Groq specific configuration
 */
export interface GroqConfig extends BaseProviderConfig {
  type: 'groq';
  model: string; // e.g., 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768'
}

/**
 * Union type of all provider configurations
 */
export type ProviderConfig = AzureOpenAIConfig | GoogleGeminiConfig | GroqConfig;

/**
 * AI Provider interface following Single Responsibility Principle (SRP)
 * Each provider handles only AI generation operations
 */
export interface IAIProvider {
  /**
   * Initialize the provider with configuration
   */
  initialize(config: ProviderConfig): Promise<void>;

  /**
   * Generate a response from the AI model
   */
  generateResponse(prompt: string): Promise<string>;

  /**
   * Get the provider name
   */
  getName(): string;

  /**
   * Get the provider type
   */
  getType(): ProviderType;

  /**
   * Validate if the provider is properly configured
   */
  isConfigured(): boolean;
}

/**
 * Configuration validator interface (ISP - separate validation concern)
 */
export interface IProviderConfigValidator {
  validate(config: ProviderConfig): { valid: boolean; errors: string[] };
}

/**
 * Provider metadata for UI display
 */
export interface ProviderMetadata {
  type: ProviderType;
  name: string;
  description: string;
  requiredFields: Array<{
    key: string;
    label: string;
    placeholder: string;
    type: 'text' | 'password';
    required: boolean;
  }>;
  models?: string[];
}
