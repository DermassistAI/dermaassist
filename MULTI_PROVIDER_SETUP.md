# Multi-Provider AI Setup Guide

DermAssist now supports multiple AI providers, allowing you to choose the best model for your needs. This guide will walk you through setting up each provider.

## Supported Providers

1. **Azure OpenAI** - Microsoft's Azure OpenAI Service (GPT-4o models)
2. **Google Gemini** - Google's Gemini models via AI Studio
3. **Groq** - Ultra-fast inference with LLaMA and Mixtral models

The application automatically detects which provider is configured and uses it. You only need to configure ONE provider.

## Architecture Overview

This implementation follows SOLID principles:

- **Single Responsibility**: Each provider class handles only its specific AI operations
- **Open/Closed**: New providers can be added without modifying existing code
- **Liskov Substitution**: All providers implement the same interface and can be swapped seamlessly
- **Interface Segregation**: Focused interfaces for specific concerns (AI generation, validation, configuration)
- **Dependency Inversion**: High-level modules depend on abstractions (IAIProvider), not concrete implementations

## Quick Start

### 1. Choose Your Provider

Pick ONE of the following options based on your needs:

#### Option A: Azure OpenAI (Default)
**Best for:** Production use, enterprise applications
**Pricing:** Pay-as-you-go, based on tokens
**Speed:** Moderate
**Setup time:** ~10 minutes

#### Option B: Google Gemini
**Best for:** Cost-effective development, Google Cloud users
**Pricing:** Generous free tier, then pay-as-you-go
**Speed:** Fast
**Setup time:** ~5 minutes

#### Option C: Groq
**Best for:** Speed-critical applications, testing
**Pricing:** Free tier available, then pay-as-you-go
**Speed:** Ultra-fast (fastest of all options)
**Setup time:** ~5 minutes

### 2. Get Your API Credentials

#### For Azure OpenAI:

1. Go to [Azure Portal](https://portal.azure.com)
2. Create an Azure OpenAI resource (if you don't have one)
3. Navigate to "Keys and Endpoint"
4. Copy the following:
   - API Key
   - Endpoint URL
   - Deployment name (the name you gave to your model deployment)
5. Note the API version (usually `2024-02-15-preview`)

#### For Google Gemini:

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key or use an existing one
5. Copy the API key
6. Choose your model (recommended: `gemini-1.5-flash` for speed, `gemini-1.5-pro` for quality)

#### For Groq:

1. Go to [Groq Console](https://console.groq.com)
2. Sign up or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key immediately (it won't be shown again)
6. Choose your model (recommended: `llama-3.3-70b-versatile`)

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials for your chosen provider:

#### For Azure OpenAI:

```bash
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

#### For Google Gemini:

```bash
GOOGLE_GEMINI_API_KEY=your_api_key_here
GOOGLE_GEMINI_MODEL=gemini-1.5-flash
```

Available models:
- `gemini-1.5-flash` - Fast, cost-effective
- `gemini-1.5-pro` - Higher quality, slower
- `gemini-2.0-flash` - Latest model

#### For Groq:

```bash
GROQ_API_KEY=your_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Available models:
- `llama-3.3-70b-versatile` - Best all-around performance
- `mixtral-8x7b-32768` - Large context window
- `llama-3.1-70b-versatile` - Alternative LLaMA option

### 4. Run the Application

```bash
pnpm install
pnpm dev
```

The application will automatically detect and use your configured provider.

## Supabase Storage (Optional)

By default, analysis results are stored in local JSON files (`data/results.json`). For production use, we recommend setting up Supabase for persistent storage.

### Setup Supabase:

1. Go to [Supabase](https://supabase.com) and create a project
2. Copy your project URL and anon key from Settings > API
3. Add to `.env`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Run the database schema:
   - Open Supabase SQL Editor
   - Copy the contents of `supabase/schema.sql`
   - Execute the SQL

Now analysis results will automatically be stored in Supabase instead of local files.

## Provider Selection Priority

If multiple providers are configured, the application uses this priority:

1. Google Gemini (if `GOOGLE_GEMINI_API_KEY` is set)
2. Groq (if `GROQ_API_KEY` is set)
3. Azure OpenAI (default fallback)

## Testing Your Setup

1. Start the development server: `pnpm dev`
2. Navigate to the demo page: http://localhost:3000/demo
3. Upload an image and complete the analysis
4. Check the console logs - you should see: `Using AI provider: [Your Provider Name]`

## Troubleshooting

### Error: "No AI provider configured"

**Solution:** Make sure you've set at least one provider's environment variables in your `.env` file.

### Error: "API key is required"

**Solution:** Check that your API key is correctly copied and has no extra spaces or line breaks.

### Error: "Endpoint must be a valid URL" (Azure OpenAI)

**Solution:** Ensure your endpoint starts with `https://` and includes the full Azure resource URL.

### Analysis returns generic error message

**Solution:** 
1. Check the API key has the correct permissions
2. For Azure OpenAI, ensure your deployment name matches exactly
3. For Google Gemini/Groq, ensure the model name is spelled correctly

## Cost Considerations

### Azure OpenAI
- GPT-4o-mini: ~$0.15/$0.60 per 1M input/output tokens
- GPT-4o: ~$2.50/$10 per 1M input/output tokens

### Google Gemini
- Generous free tier (15 requests per minute)
- After free tier: $0.075/$0.30 per 1M input/output tokens (Flash)

### Groq
- Free tier available
- Very fast inference speed
- Pay-as-you-go after free tier

## Architecture Details

The provider abstraction follows these design patterns:

1. **Factory Pattern**: `AIProviderFactory` creates appropriate provider instances
2. **Template Method**: `BaseAIProvider` defines common behavior, subclasses implement specifics
3. **Repository Pattern**: Data storage is abstracted through `IAnalysisResultsRepository`
4. **Strategy Pattern**: Providers are interchangeable strategies for AI generation

### Adding a New Provider

To add a new provider:

1. Create a new class extending `BaseAIProvider` in `src/lib/providers/`
2. Implement required methods: `createClient()`, `generateResponse()`, `getName()`, `getType()`
3. Add provider type to `ProviderType` union in `types.ts`
4. Add provider metadata to `PROVIDER_METADATA` in `metadata.ts`
5. Update `AIProviderFactory` to handle the new provider
6. Update `getProviderConfigFromEnv()` in `app/api/ai/route.ts`

Example structure:
```typescript
export class NewProvider extends BaseAIProvider {
  protected async createClient(): Promise<void> {
    const config = this.getConfig() as NewProviderConfig;
    this.client = ai({
      name: 'provider-name',
      apiKey: config.apiKey,
      // ... other config
    } as any);
  }

  async generateResponse(prompt: string): Promise<string> {
    const client = this.getClient() as AxAIService;
    return await callModelText(client, prompt);
  }

  getName(): string {
    return 'New Provider';
  }

  getType(): ProviderType {
    return 'new-provider';
  }
}
```

## Support

For issues or questions:
1. Check this guide first
2. Review provider documentation links above
3. Check application logs for detailed error messages
4. Open an issue on GitHub with full error details
