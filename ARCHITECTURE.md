# Architecture Overview

This document provides a visual overview of the DermAssist multi-provider architecture following SOLID principles.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js Application                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Layer                                │
│  ┌────────────────┐              ┌──────────────────┐          │
│  │  /api/ai       │              │  /api/results    │          │
│  │  (POST)        │              │  (POST/GET)      │          │
│  └────────┬───────┘              └────────┬─────────┘          │
└───────────┼──────────────────────────────┼────────────────────┘
            │                              │
            ▼                              ▼
┌───────────────────────┐      ┌──────────────────────────┐
│  Provider Factory     │      │  Repository Factory      │
│  (Factory Pattern)    │      │  (Factory Pattern)       │
└───────┬───────────────┘      └──────────┬───────────────┘
        │                                 │
        │                                 ▼
        │                      ┌──────────────────────────┐
        │                      │ IAnalysisResultsRepo     │
        │                      │ (Interface)              │
        │                      └──────────┬───────────────┘
        │                                 │
        │                    ┌────────────┴────────────┐
        │                    ▼                         ▼
        │         ┌──────────────────────┐  ┌─────────────────┐
        │         │ SupabaseRepository   │  │ FileRepository  │
        │         │ (Supabase Storage)   │  │ (JSON Fallback) │
        │         └──────────────────────┘  └─────────────────┘
        │
        ▼
┌────────────────────┐
│  IAIProvider       │
│  (Interface)       │
└────────┬───────────┘
         │
    ┌────┴──────────────────┐
    ▼                       ▼                        ▼
┌──────────────┐  ┌────────────────┐  ┌──────────────────┐
│ BaseAIProvider│  │ BaseAIProvider │  │ BaseAIProvider   │
│ (Abstract)    │  │ (Abstract)     │  │ (Abstract)       │
└───────┬──────┘  └───────┬────────┘  └────────┬─────────┘
        │                 │                     │
        ▼                 ▼                     ▼
┌──────────────┐  ┌────────────────┐  ┌──────────────────┐
│ AzureOpenAI  │  │ GoogleGemini   │  │ Groq             │
│ Provider     │  │ Provider       │  │ Provider         │
└──────┬───────┘  └───────┬────────┘  └────────┬─────────┘
       │                  │                     │
       ▼                  ▼                     ▼
┌──────────────┐  ┌────────────────┐  ┌──────────────────┐
│ ax-llm       │  │ ax-llm         │  │ ax-llm           │
│ azure-openai │  │ google-gemini  │  │ groq             │
└──────────────┘  └────────────────┘  └──────────────────┘
```

## SOLID Principles Applied

### 1. Single Responsibility Principle (SRP)

```
┌─────────────────────────┐
│ Each class has ONE job: │
└─────────────────────────┘
    │
    ├─ AzureOpenAIProvider → Handle Azure OpenAI operations only
    │
    ├─ SupabaseRepository → Handle Supabase data operations only
    │
    ├─ ProviderConfigValidator → Validate configurations only
    │
    └─ AIProviderFactory → Create provider instances only
```

### 2. Open/Closed Principle (OCP)

```
┌──────────────────────────────────────┐
│ Open for Extension                   │
│ Closed for Modification              │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ Add new provider WITHOUT modifying:  │
│                                      │
│ 1. Create NewProvider extends Base   │
│ 2. Implement required methods        │
│ 3. Register in Factory               │
│ 4. Add to metadata                   │
│                                      │
│ ✅ No changes to existing providers! │
└──────────────────────────────────────┘
```

### 3. Liskov Substitution Principle (LSP)

```
┌────────────────────────────────────────┐
│ All providers are interchangeable:    │
└────────────────────────────────────────┘
         │
         ├─ AzureOpenAIProvider
         ├─ GoogleGeminiProvider     } All implement
         └─ GroqProvider              } IAIProvider

┌────────────────────────────────────────┐
│ Application code works with ANY        │
│ provider without knowing the concrete  │
│ implementation                         │
└────────────────────────────────────────┘
```

### 4. Interface Segregation Principle (ISP)

```
┌───────────────────────────────────────────┐
│ Focused, minimal interfaces:              │
└───────────────────────────────────────────┘
         │
         ├─ IAIProvider
         │   └─ initialize(), generateResponse(), getName(), getType(), isConfigured()
         │
         ├─ IAnalysisResultsRepository
         │   └─ save(), getById(), getAll()
         │
         └─ IProviderConfigValidator
             └─ validate()

Each interface serves a specific purpose!
```

### 5. Dependency Inversion Principle (DIP)

```
┌──────────────────────────────────────────────────┐
│ High-level modules depend on abstractions:       │
└──────────────────────────────────────────────────┘

API Route (High-level)
    │
    └─ depends on ─→ IAIProvider (Abstraction)
                          │
                          └─ implemented by ─→ Concrete Providers

API Route (High-level)
    │
    └─ depends on ─→ IAnalysisResultsRepository (Abstraction)
                          │
                          └─ implemented by ─→ Concrete Repositories
```

## Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Browser   │
└──────┬──────┘
       │
       │ 1. Upload image + history
       ▼
┌──────────────┐
│ Demo Page    │
│ (React)      │
└──────┬───────┘
       │
       │ 2. POST /api/ai
       ▼
┌─────────────────────────────────────────┐
│ AI API Route                            │
│                                         │
│ 1. getProviderConfigFromEnv()          │
│    └─ Read env vars                     │
│                                         │
│ 2. AIProviderFactory.createAndInit()   │
│    └─ Create appropriate provider       │
│                                         │
│ 3. provider.generateResponse()         │
│    └─ Call AI model                     │
└──────┬──────────────────────────────────┘
       │
       │ 3. Return results
       ▼
┌──────────────┐
│ Demo Page    │
└──────┬───────┘
       │
       │ 4. POST /api/results
       ▼
┌─────────────────────────────────────────┐
│ Results API Route                       │
│                                         │
│ 1. getAnalysisResultsRepository()      │
│    └─ Get Supabase or File repo        │
│                                         │
│ 2. repository.save()                   │
│    └─ Store in Supabase or File        │
└──────┬──────────────────────────────────┘
       │
       │ 5. Confirmation
       ▼
┌──────────────┐
│ Demo Page    │
│ Show results │
└──────────────┘
```

## Provider Selection Flow

```
┌─────────────────────────────────────┐
│ getProviderConfigFromEnv()          │
└───────────────┬─────────────────────┘
                │
                ├─ Check GOOGLE_GEMINI_API_KEY?
                │   └─ Yes → Return GoogleGeminiConfig
                │
                ├─ Check GROQ_API_KEY?
                │   └─ Yes → Return GroqConfig
                │
                └─ Check AZURE_OPENAI_API_KEY + ENDPOINT?
                    └─ Yes → Return AzureOpenAIConfig
                    └─ No → Throw Error
```

## Storage Strategy Flow

```
┌─────────────────────────────────────┐
│ getAnalysisResultsRepository()      │
└───────────────┬─────────────────────┘
                │
                ├─ Check isSupabaseConfigured()?
                │   │
                │   ├─ Yes → Return SupabaseRepository
                │   │         └─ Store in Supabase tables
                │   │
                │   └─ No → Return FileRepository
                │             └─ Store in data/results.json
                │
                └─ Both implement IAnalysisResultsRepository
                   └─ Same interface, different storage
```

## Component Responsibility Matrix

| Component                    | Responsibility                          | SOLID Principle |
|------------------------------|-----------------------------------------|-----------------|
| `IAIProvider`                | Define provider interface               | ISP, DIP        |
| `BaseAIProvider`             | Common provider behavior                | SRP, OCP        |
| `AzureOpenAIProvider`        | Azure OpenAI specific logic             | SRP, LSP        |
| `GoogleGeminiProvider`       | Google Gemini specific logic            | SRP, LSP        |
| `GroqProvider`               | Groq specific logic                     | SRP, LSP        |
| `AIProviderFactory`          | Create provider instances               | SRP, OCP        |
| `IAnalysisResultsRepository` | Define storage interface                | ISP, DIP        |
| `SupabaseRepository`         | Supabase storage implementation         | SRP, LSP        |
| `FileRepository`             | File storage implementation             | SRP, LSP        |
| `ProviderConfigValidator`    | Validate provider configurations        | SRP, ISP        |
| `/api/ai`                    | Handle AI requests                      | SRP, DIP        |
| `/api/results`               | Handle result storage                   | SRP, DIP        |

## Extension Points

Want to add a new provider? Here's the process:

```
1. Create New Provider Class
   └─ Extend BaseAIProvider
   └─ Implement required methods

2. Add Type Definition
   └─ Add to ProviderType union in types.ts
   └─ Create config interface (e.g., NewProviderConfig)

3. Update Factory
   └─ Add case in AIProviderFactory.createProvider()

4. Add Metadata
   └─ Add entry to PROVIDER_METADATA

5. Update Environment Detection
   └─ Add check in getProviderConfigFromEnv()

✅ Done! No changes to existing code needed!
```

## Design Pattern Summary

| Pattern           | Location                              | Purpose                                    |
|-------------------|---------------------------------------|--------------------------------------------|
| Factory           | `AIProviderFactory`                   | Create provider instances                  |
| Template Method   | `BaseAIProvider`                      | Define algorithm structure                 |
| Repository        | `IAnalysisResultsRepository`          | Abstract data access                       |
| Strategy          | `IAIProvider` implementations         | Interchangeable AI providers               |
| Singleton         | `getSupabaseClient()`                 | Single Supabase client instance            |
| Dependency Injection | API routes                         | Inject dependencies through abstractions   |

## Testing Strategy

```
Unit Tests
    │
    ├─ Provider Classes
    │   └─ Test each provider independently
    │
    ├─ Repository Classes
    │   └─ Test storage operations
    │
    └─ Validators
        └─ Test configuration validation

Integration Tests
    │
    ├─ Provider Factory
    │   └─ Test provider creation
    │
    ├─ API Routes
    │   └─ Test end-to-end flow
    │
    └─ Storage
        └─ Test Supabase and File storage

E2E Tests
    │
    └─ Full User Flow
        └─ Upload → Analyze → Store → Display
```

## Conclusion

This architecture provides:
- ✅ Flexibility to add new providers
- ✅ Clean separation of concerns
- ✅ Easy testing and maintenance
- ✅ Type safety with TypeScript
- ✅ Production-ready error handling
- ✅ Scalable storage solutions

For implementation details, see:
- [Multi-Provider Setup Guide](./MULTI_PROVIDER_SETUP.md)
- [Testing Guide](./TESTING_GUIDE.md)
