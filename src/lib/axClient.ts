/**
 * Ax-LLM client helpers for Azure OpenAI integration.
 * Uses GPT-4o-mini (or other Azure OpenAI models) for culturally-aware dermatological diagnostics.
 */
import { ai } from "@ax-llm/ax";

/* ---- Azure OpenAI models (const map + union type) ---- */
export const AZURE_OPENAI_MODELS = {
  GPT_4O_MINI: "gpt-4o-mini",
  GPT_4O: "gpt-4o",
  GPT_4: "gpt-4",
} as const;

export type AzureOpenAIModel = typeof AZURE_OPENAI_MODELS[keyof typeof AZURE_OPENAI_MODELS];

type AiClient = unknown;

export function createAzureOpenAIClient(options?: { apiKey?: string; endpoint?: string; deployment?: string; apiVersion?: string }): AiClient {
  // Get environment variables from process.env (server-side) or Next.js public vars (client-side)
  const getEnvVar = (key: string) => {
    if (typeof process !== 'undefined' && process.env?.[key]) {
      return process.env[key];
    }
    // Next.js public vars for client-side (if absolutely necessary)
    if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.props?.pageProps?.[key]) {
      return (window as any).__NEXT_DATA__.props.pageProps[key];
    }
    return undefined;
  };

  const apiKey = options?.apiKey ?? getEnvVar('AZURE_OPENAI_API_KEY');
  const endpoint = options?.endpoint ?? getEnvVar('AZURE_OPENAI_ENDPOINT');
  const deployment = options?.deployment ?? getEnvVar('AZURE_OPENAI_DEPLOYMENT') ?? AZURE_OPENAI_MODELS.GPT_4O_MINI;
  const apiVersion = options?.apiVersion ?? getEnvVar('AZURE_OPENAI_API_VERSION') ?? '2024-02-15-preview';

  if (!apiKey) {
    throw new Error('Azure OpenAI API key is required. Set AZURE_OPENAI_API_KEY environment variable.');
  }

  if (!endpoint) {
    throw new Error('Azure OpenAI endpoint is required. Set AZURE_OPENAI_ENDPOINT environment variable.');
  }

  // Initialize Azure OpenAI provider with ax-llm
  const providerConfig: Record<string, unknown> = { 
    model: deployment,
    apiVersion,
    endpoint,
  };

  return (ai({ name: "azure-openai", apiKey, config: providerConfig }) as unknown) as AiClient;
}

export function createDefaultClient(): AiClient {
  return createAzureOpenAIClient();
}

export default {
  AZURE_OPENAI_MODELS,
  createAzureOpenAIClient,
  createDefaultClient,
};
