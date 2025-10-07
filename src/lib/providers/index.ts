/**
 * Provider Module Exports
 * Central export point following Single Responsibility Principle
 */

// Types
export type {
  ProviderType,
  BaseProviderConfig,
  AzureOpenAIConfig,
  GoogleGeminiConfig,
  GroqConfig,
  ProviderConfig,
  IAIProvider,
  IProviderConfigValidator,
  ProviderMetadata,
} from './types';

// Base class
export { BaseAIProvider } from './BaseAIProvider';

// Concrete implementations
export { AzureOpenAIProvider } from './AzureOpenAIProvider';
export { GoogleGeminiProvider } from './GoogleGeminiProvider';
export { GroqProvider } from './GroqProvider';

// Factory
export { AIProviderFactory } from './AIProviderFactory';

// Metadata and validation
export {
  PROVIDER_METADATA,
  ProviderConfigValidator,
  getAvailableProviders,
  getProviderMetadata,
} from './metadata';
