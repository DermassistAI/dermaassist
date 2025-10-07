Use solid principles
I am using pnpm
always use context7 mcp server to fetch docs
always fetch docs and implement according to docs
i am using ax/llm for agents

## SOLID Principles Implementation Guidelines

### Single Responsibility Principle (SRP)
- Each class/module should have one reason to change
- Separate concerns: AI provider logic, data storage, UI components, configuration
- Example: AIProvider handles only AI operations, DataRepository handles only data persistence

### Open/Closed Principle (OCP)
- Classes should be open for extension but closed for modification
- Use interfaces and abstract classes for extensibility
- New AI providers should be addable without modifying existing code

### Liskov Substitution Principle (LSP)
- Derived classes must be substitutable for their base classes
- All AI providers must implement the same interface consistently
- Switching providers should not break functionality

### Interface Segregation Principle (ISP)
- Clients should not be forced to depend on interfaces they don't use
- Create focused, specific interfaces rather than large general ones
- Example: Separate interfaces for AI generation, configuration, and validation

### Dependency Inversion Principle (DIP)
- Depend on abstractions, not concretions
- High-level modules should not depend on low-level modules
- Use dependency injection for AI providers and data repositories

## Multi-Provider AI Architecture

### Supported Providers
1. **Azure OpenAI** - GPT-4o, GPT-4o-mini, GPT-4
2. **Google Gemini** - gemini-1.5-flash, gemini-1.5-pro, gemini-2.0-flash
3. **Groq** - llama-3.3-70b-versatile, mixtral-8x7b-32768

### Provider Interface Design
```typescript
interface IAIProvider {
  initialize(config: ProviderConfig): Promise<void>;
  generateResponse(prompt: string): Promise<string>;
  validateConfig(): boolean;
  getName(): string;
}
```

### Configuration Flow
1. User selects provider type (Azure OpenAI, Google Gemini, or Groq)
2. System prompts for provider-specific credentials:
   - Azure OpenAI: API Key, Endpoint, Deployment Name, API Version
   - Google Gemini: API Key, Model Name
   - Groq: API Key, Model Name
3. Configuration is validated and stored securely
4. Provider is initialized and ready for use

## Supabase Integration

### Data Storage Strategy
- Store AI analysis results in Supabase PostgreSQL
- Store uploaded images in Supabase Storage buckets
- Use Row Level Security (RLS) for data protection
- Implement repository pattern for data access

### Database Schema
```sql
-- Analysis results table
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  provider_name TEXT NOT NULL,
  model_output JSONB NOT NULL,
  parsed_output JSONB,
  image_url TEXT,
  metadata JSONB
);

-- Provider configurations (encrypted)
CREATE TABLE provider_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_type TEXT NOT NULL,
  config_data JSONB NOT NULL, -- encrypted credentials
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```
