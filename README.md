This repo contains file and prototype material for the project dermassist
DermAssist is an Afrocentric digital dermatology assistant built to enhance the diagnosis, triage, and management of skin conditions—particularly those appearing on dark skin tones, which are historically underrepresented in medical datasets and diagnostic tools.

It combines AI-powered image analysis, localized knowledge, and clinical decision support to serve both healthcare providers and patients across Africa. DermAssist is not just a tool—it's a platform for equity in dermatological care, aiming to fill a critical gap in recognition, research, and access by:
- Offering accurate, inclusive diagnostic support for melanated skin
- Educating users (clinicians and patients) on common and neglected dermatoses
- Building the largest annotated dataset of Black and African skin conditions
- Facilitating early intervention and referral guidance in low-resource settings

At its core, DermAssist is a smart, culturally and clinically aware assistant that learns from African skin, speaks to African needs, and builds trust through data sovereignty, local validation, and accessibility.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- An API key from one of the supported AI providers

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Configure your AI provider (see Multi-Provider Setup Guide)
# Edit .env with your credentials

# Run development server
pnpm dev

# Build for production
pnpm build
```

## 🤖 Multi-Provider AI Support

DermAssist now supports **six AI providers**, allowing you to choose the best model for your needs:

- **Claude (Anthropic)** - Advanced reasoning with Claude Sonnet 3.5, Opus, and Haiku
- **OpenAI** - GPT-4o, GPT-4o-mini for comprehensive analysis
- **Google Gemini** - Fast, cost-effective AI via Google AI Studio (Gemini 2.0 Flash)
- **Azure OpenAI** - Enterprise-grade GPT-4o models with Microsoft Azure
- **Groq** - Ultra-fast inference with LLaMA 3.3 and Mixtral
- **Qwen** - Multilingual support with Alibaba Cloud's Qwen models

**[📖 Complete Setup Guide](./MULTI_PROVIDER_SETUP.md)** - Detailed instructions for configuring each provider

### Quick Configuration

Choose ONE or MORE providers and add to your `.env` file:

**Claude (Recommended for clinical analysis):**
```bash
ANTHROPIC_API_KEY=your_key
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

**OpenAI:**
```bash
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o
```

**Google Gemini:**
```bash
GOOGLE_GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.0-flash-exp
```

**Azure OpenAI:**
```bash
AZURE_OPENAI_API_KEY=your_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
```

**Groq:**
```bash
GROQ_API_KEY=your_key
GROQ_MODEL=llama-3.3-70b-versatile
```

**Qwen:**
```bash
QWEN_API_KEY=your_key
QWEN_MODEL=qwen-max
```

## 💾 Supabase Storage (Optional)

For production deployments, configure Supabase for persistent storage:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Then run the SQL schema from `supabase/schema.sql` in your Supabase project.

See **[Multi-Provider Setup Guide](./MULTI_PROVIDER_SETUP.md#supabase-storage-optional)** for detailed instructions.

## 🏗️ Architecture

Built with SOLID principles:

- **Single Responsibility**: Focused, maintainable components
- **Open/Closed**: Extensible without modification
- **Liskov Substitution**: Interchangeable providers
- **Interface Segregation**: Specific, minimal interfaces
- **Dependency Inversion**: Abstract over concrete implementations

**Key Design Patterns:**
- Factory Pattern for provider creation
- Repository Pattern for data access
- Template Method for shared behavior
- Strategy Pattern for AI provider selection

## 📚 Documentation

- **[Setup Guide (SETUP.md)](./SETUP.md)** - Complete setup instructions including authentication
- **[Testing Guide (TESTING.md)](./TESTING.md)** - Comprehensive testing documentation
- **[Design Specification (kombai.md)](./kombai.md)** - UI/UX design specifications for Figma Make
- **[Multi-Provider Setup (MULTI_PROVIDER_SETUP.md)](./MULTI_PROVIDER_SETUP.md)** - AI provider configuration
- **[Architecture (ARCHITECTURE.md)](./ARCHITECTURE.md)** - System architecture and SOLID principles
- **[Supabase Schema](./supabase/schema.sql)** - Database setup for Supabase
- **[Migration Summary](./MIGRATION_SUMMARY.md)** - Next.js migration details

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Testing

DermAssist includes comprehensive testing:

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run provider tests
pnpm test:providers

# Run with UI
pnpm test:ui
```

See **[TESTING.md](./TESTING.md)** for complete testing documentation.

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Framework**: ax-llm
- **Database**: Supabase (optional)
- **UI Components**: Radix UI + shadcn/ui

## 🤝 Contributing

We welcome contributions! Please ensure:

1. Code follows SOLID principles
2. New AI providers implement `IAIProvider` interface
3. Tests are added for new features
4. Documentation is updated

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

Built with the mission of advancing equitable dermatological care for African skin tones.
