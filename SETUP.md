# Environment Setup for Azure OpenAI with AX-LLM

This application uses Azure OpenAI via the AX-LLM framework for AI-powered skin condition analysis.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your_azure_openai_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

## About AX-LLM

This application uses [AX-LLM](https://github.com/ax-llm/ax) as the AI agent framework, which provides:
- Unified interface for multiple LLM providers
- Built-in support for Azure OpenAI
- Type-safe API with excellent error handling
- Streaming and structured output support

## Getting Azure OpenAI Credentials

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure OpenAI resource
3. Copy the **Endpoint** and **Key** from the "Keys and Endpoint" section
4. Create a deployment of the GPT-4 mini model and use that deployment name

## Model Setup

This application is configured to use **gpt-4o-mini** (GPT-4 Omni Mini) which is:
- Cost-effective for production use
- Fast response times
- Excellent for diagnostic reasoning tasks
- Supports structured output

## Running Locally

After setting up your environment variables:

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`

## API Route

The AI analysis is handled by the Next.js API route at `/api/analyze`.

This is a server-side route that:
- Accepts patient information and optional image data
- Uses AX-LLM to send a structured prompt to Azure OpenAI
- Returns a JSON response with diagnosis, recommendations, and cultural considerations

## AX-LLM Configuration

The AX-LLM client is configured in the API route with:
```typescript
const ai = new AI({
  name: 'azure',
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  config: {
    apiURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  }
});
```

## Security Notes

- Never commit your `.env.local` file to version control
- The API key should only be used on the server side (which Next.js API routes handle automatically)
- Consider implementing rate limiting for production use
- Add authentication/authorization as needed for your use case
