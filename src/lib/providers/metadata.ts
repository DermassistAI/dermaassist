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
        placeholder: 'gemini-2.0-flash-exp',
        type: 'text',
        required: true,
      },
    ],
    models: ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro'],
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
  'claude': {
    type: 'claude',
    name: 'Claude (Anthropic)',
    description: 'Anthropic Claude models with advanced reasoning',
    requiredFields: [
      {
        key: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your Anthropic API key (sk-ant-...)',
        type: 'password',
        required: true,
      },
      {
        key: 'model',
        label: 'Model',
        placeholder: 'claude-3-5-sonnet-20241022',
        type: 'text',
        required: true,
      },
    ],
    models: [
      'claude-3-5-sonnet-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307',
    ],
  },
  'openai': {
    type: 'openai',
    name: 'OpenAI',
    description: 'OpenAI GPT-4o and GPT-4o-mini models',
    requiredFields: [
      {
        key: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your OpenAI API key (sk-...)',
        type: 'password',
        required: true,
      },
      {
        key: 'model',
        label: 'Model',
        placeholder: 'gpt-4o',
        type: 'text',
        required: true,
      },
    ],
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
  },
  'qwen': {
    type: 'qwen',
    name: 'Qwen',
    description: 'Alibaba Cloud Qwen models with multilingual support',
    requiredFields: [
      {
        key: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your Qwen/DashScope API key',
        type: 'password',
        required: true,
      },
      {
        key: 'model',
        label: 'Model',
        placeholder: 'qwen-max',
        type: 'text',
        required: true,
      },
      {
        key: 'endpoint',
        label: 'Endpoint (optional)',
        placeholder: 'https://dashscope.aliyuncs.com/api/v1/...',
        type: 'text',
        required: false,
      },
    ],
    models: ['qwen-max', 'qwen-plus', 'qwen-turbo', 'qwen-max-longcontext'],
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

      case 'claude':
        if (!config.model || config.model.trim() === '') {
          errors.push('Model is required for Claude');
        }
        // Validate API key format
        if (config.apiKey && !config.apiKey.startsWith('sk-ant-')) {
          errors.push('Claude API key should start with "sk-ant-"');
        }
        break;

      case 'openai':
        if (!config.model || config.model.trim() === '') {
          errors.push('Model is required for OpenAI');
        }
        // Validate API key format
        if (config.apiKey && !config.apiKey.startsWith('sk-')) {
          errors.push('OpenAI API key should start with "sk-"');
        }
        break;

      case 'qwen':
        if (!config.model || config.model.trim() === '') {
          errors.push('Model is required for Qwen');
        }
        // Validate endpoint if provided
        if (config.endpoint) {
          try {
            new URL(config.endpoint);
          } catch {
            errors.push('Endpoint must be a valid URL');
          }
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
