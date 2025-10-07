/**
 * Provider Metadata and Configuration Helpers
 * Following Single Responsibility Principle (SRP)
 */

import type { ProviderMetadata, ProviderType, ProviderConfig, IProviderConfigValidator } from './types';

/**
 * Provider metadata for UI display
 * Helps users understand what configuration is needed for each provider
 */
export const PROVIDER_METADATA: Record<ProviderType, ProviderMetadata> = {
  'azure-openai': {
    type: 'azure-openai',
    name: 'Azure OpenAI',
    description: 'Microsoft Azure OpenAI Service with GPT-4o models',
    requiredFields: [
      {
        key: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your Azure OpenAI API key',
        type: 'password',
        required: true,
      },
      {
        key: 'endpoint',
        label: 'Endpoint',
        placeholder: 'https://your-resource.openai.azure.com',
        type: 'text',
        required: true,
      },
      {
        key: 'deployment',
        label: 'Deployment Name',
        placeholder: 'gpt-4o-mini',
        type: 'text',
        required: true,
      },
      {
        key: 'apiVersion',
        label: 'API Version',
        placeholder: '2024-02-15-preview',
        type: 'text',
        required: false,
      },
    ],
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4'],
  },
  'google-gemini': {
    type: 'google-gemini',
    name: 'Google Gemini',
    description: 'Google AI Gemini models via AI Studio',
    requiredFields: [
      {
        key: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your Google AI API key from AI Studio',
        type: 'password',
        required: true,
      },
      {
        key: 'model',
        label: 'Model',
        placeholder: 'gemini-1.5-flash',
        type: 'text',
        required: true,
      },
    ],
    models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'],
  },
  'groq': {
    type: 'groq',
    name: 'Groq',
    description: 'Groq fast inference with LLaMA and Mixtral models',
    requiredFields: [
      {
        key: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your Groq API key from console.groq.com',
        type: 'password',
        required: true,
      },
      {
        key: 'model',
        label: 'Model',
        placeholder: 'llama-3.3-70b-versatile',
        type: 'text',
        required: true,
      },
    ],
    models: ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'llama-3.1-70b-versatile'],
  },
};

/**
 * Provider Configuration Validator
 * Implements IProviderConfigValidator interface (ISP)
 */
export class ProviderConfigValidator implements IProviderConfigValidator {
  validate(config: ProviderConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Common validation
    if (!config.apiKey || config.apiKey.trim() === '') {
      errors.push('API Key is required');
    }

    // Type-specific validation
    switch (config.type) {
      case 'azure-openai':
        if (!config.endpoint || config.endpoint.trim() === '') {
          errors.push('Endpoint is required for Azure OpenAI');
        }
        if (!config.deployment || config.deployment.trim() === '') {
          errors.push('Deployment name is required for Azure OpenAI');
        }
        // Validate endpoint format
        if (config.endpoint) {
          try {
            new URL(config.endpoint);
          } catch {
            errors.push('Endpoint must be a valid URL');
          }
        }
        break;

      case 'google-gemini':
        if (!config.model || config.model.trim() === '') {
          errors.push('Model is required for Google Gemini');
        }
        break;

      case 'groq':
        if (!config.model || config.model.trim() === '') {
          errors.push('Model is required for Groq');
        }
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Get list of all available providers
 */
export function getAvailableProviders(): ProviderMetadata[] {
  return Object.values(PROVIDER_METADATA);
}

/**
 * Get metadata for a specific provider
 */
export function getProviderMetadata(type: ProviderType): ProviderMetadata {
  return PROVIDER_METADATA[type];
}
