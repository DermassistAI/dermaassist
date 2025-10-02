/**
 * Ax-LLM client helpers with stronger developer-facing types.
 *
 * We expose const-model maps (not enums) and literal union types derived
 * from them. The ai(...) calls are lightly cast to satisfy the ax-llm
 * initialization typing while keeping inputs typed.
 */
import { ai } from "@ax-llm/ax";

/* ---- Qwen models (const map + union type) ---- */
export const QWEN_MODELS = {
  QWEN3_32B: "qwen3-32b",
} as const;

export type QwenModel = typeof QWEN_MODELS[keyof typeof QWEN_MODELS];

type AiClient = unknown;

export function createQwenClient(options?: { apiKey?: string; model?: QwenModel }): AiClient {
  // Use Groq as the inference gateway and forward to Qwen model.
  // Prefer Vite client-side env var (VITE_GROQ_APIKEY) when running in the browser.
  const viteEnv = (typeof import.meta !== 'undefined') ? (import.meta.env as unknown as Record<string, string | undefined>) : {};
  const apiKey = options?.apiKey ?? viteEnv.VITE_GROQ_APIKEY ?? (typeof process !== 'undefined' ? process.env.GROQ_APIKEY : undefined);
  const model = options?.model ?? QWEN_MODELS.QWEN3_32B;
  // Allow overriding the Groq API base (helpful when provider endpoints change or for local proxies)
  const serverEnv = (typeof process !== 'undefined') ? (process as unknown as { env?: Record<string, string | undefined> }).env : undefined;
  const apiBase = options?.apiKey ? undefined : (viteEnv.VITE_GROQ_API_BASE ?? (serverEnv ? serverEnv.GROQ_API_BASE : undefined));

  // Initialize Groq provider dynamically and ask it to run the Qwen model.
  // Different ax-llm releases may type providers differently, so cast safely.
    // dynamic provider init for groq forwarding to qwen
  // Pass apiBase/baseUrl for provider compatibility in case the provider expects a named field.
  const providerConfig: Record<string, unknown> = { model };
  if (apiBase) {
    providerConfig.apiBase = apiBase;
    providerConfig.baseUrl = apiBase;
  }

  return (ai({ name: "groq", apiKey, config: providerConfig }) as unknown) as AiClient;
}

export function createDefaultClient(): AiClient {
  // default to qwen only
  return createQwenClient();
}

export default {
  QWEN_MODELS,
  createQwenClient,
  createDefaultClient,
};
