import { NextResponse } from 'next/server'
import axClient from '@/lib/axClient'
import { callModelText } from '@/lib/axHelpers'
import { buildPrompt } from '@/lib/axSignatures'
import { AIProviderFactory, type ProviderConfig } from '@/lib/providers'

/**
 * Get provider configuration from environment variables
 * Follows Dependency Inversion Principle - depends on ProviderConfig abstraction
 */
function getProviderConfigFromEnv(): ProviderConfig {
  // Check for Google Gemini configuration
  const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    return {
      type: 'google-gemini',
      apiKey: geminiApiKey,
      model: process.env.GOOGLE_GEMINI_MODEL || 'gemini-1.5-flash',
    };
  }

  // Check for Groq configuration
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey) {
    return {
      type: 'groq',
      apiKey: groqApiKey,
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    };
  }

  // Default to Azure OpenAI (existing configuration)
  const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini';
  const azureApiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

  if (!azureApiKey || !azureEndpoint) {
    throw new Error('No AI provider configured. Set environment variables for Azure OpenAI, Google Gemini, or Groq.');
  }

  return {
    type: 'azure-openai',
    apiKey: azureApiKey,
    endpoint: azureEndpoint,
    deployment: azureDeployment,
    apiVersion: azureApiVersion,
  };
}

export async function POST(req: Request) {
  try {
  const body = await req.json()
  const input = body?.input
  if (!input) return NextResponse.json({ error: 'Missing input' }, { status: 400 })

  // Build sanitized prompt server-side to avoid sending large base64 images
  const prompt = buildPrompt(input)

  // Use provider factory to create and initialize the appropriate provider
  // Following Factory Pattern and Dependency Inversion Principle
  const config = getProviderConfigFromEnv();
  const provider = await AIProviderFactory.createAndInitialize(config);
  
  console.log(`Using AI provider: ${provider.getName()}`);

    const text = await provider.generateResponse(String(prompt))

    // Try to parse the model response as JSON matching ModelOutput
    let parsed: any = null
    try {
      parsed = JSON.parse(String(text))
    } catch (e) {
      // not JSON — we'll synthesize a friendly ModelOutput fallback
      const shortSummary = String(text).slice(0, 1600)
      parsed = {
        summary: shortSummary,
        primaryDiagnosis: {
          condition: 'Unable to determine from provided data',
          confidence: 0,
          severity: '',
          description: shortSummary,
        },
        differentials: [],
        culturalConsiderations: [],
        recommendations: [
          'Provide higher-resolution images and detailed clinical history (age, skin type, duration, symptoms).',
          'If urgent features are present (rapid growth, bleeding, systemic symptoms) advise in-person evaluation.'
        ],
      }
    }

    return NextResponse.json({ text, parsed, providerName: provider.getName() })
  } catch (err: any) {
    console.error('API /api/ai error:', err)
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}
