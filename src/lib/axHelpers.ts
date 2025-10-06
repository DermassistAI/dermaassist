/**
 * Lightweight, typed helpers to call ax-llm clients using proper API patterns.
 * Updated to match ax-llm documentation and expected client behavior.
 */
import { ax, type AxAIService } from '@ax-llm/ax';

export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

/**
 * Call an ax-llm AI client with a text prompt and return the response text.
 * Uses the proper ax() pattern as documented in ax-llm.
 */
export async function callModelText(client: unknown, prompt: string): Promise<string> {
  if (!client) throw new Error("No client provided");

  try {
    // Cast client to AxAIService for ax-llm usage
    const aiService = client as AxAIService;
    
  // Use the ax() pattern which is the proper way to work with ax-llm clients
  // Based on the documentation: ax('input -> output') creates a generator
  // Avoid overly-generic field names — ax enforces descriptive names.
  const generator = ax('userPrompt:string -> analysis:string');
    
    // Forward with the AI client
    const result = await generator.forward(aiService, { userPrompt: prompt });
    
    console.debug('ax-llm generator result:', result);
    
    // Extract the response field
    if (result && typeof result === 'object') {
      const resultObj = result as Record<string, unknown>;
  // Prefer the typed 'analysis' field (non-generic) required by ax signature
  if (typeof resultObj.analysis === 'string') return resultObj.analysis;
  if (typeof resultObj.ai_result === 'string') return resultObj.ai_result;
  if (typeof resultObj.analysis_text === 'string') return resultObj.analysis_text;
      
      // Try other common field names
      if (typeof resultObj.output === 'string') return resultObj.output;
      if (typeof resultObj.content === 'string') return resultObj.content;
      if (typeof resultObj.text === 'string') return resultObj.text;
    }
    
    // If result is string directly
    if (typeof result === 'string') return result;
    
    // Store debug info for troubleshooting
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const clientObj = client as Record<string, unknown>;
        const clientSummary = {
          keys: Object.keys(clientObj),
          methods: Object.keys(clientObj).filter(k => typeof clientObj[k] === 'function'),
          resultKeys: result && typeof result === 'object' ? Object.keys(result as Record<string, unknown>) : [],
          resultType: typeof result
        };
        window.localStorage.setItem('lastModelClientSummary', JSON.stringify(clientSummary));
        window.localStorage.setItem('lastModelResponse', JSON.stringify(result));
        console.error('callModelText: extracted result but no text field found. Client summary:', clientSummary);
        console.error('callModelText: full result object:', result);
      }
    } catch (e) {
      void e;
    }
    
    throw new Error("Unable to extract text from model response; see console.error and localStorage for diagnostics.");
    
  } catch (error) {
    // Log the full error for debugging
    console.error('callModelText error:', error);
    
    // Store error info for debugging
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const clientObj = client as Record<string, unknown>;
        const errorSummary = {
          error: String(error),
          clientKeys: Object.keys(clientObj),
          clientType: typeof client
        };
        window.localStorage.setItem('lastModelError', JSON.stringify(errorSummary));
      }
    } catch (e) {
      void e;
    }
    
    throw error;
  }
}
