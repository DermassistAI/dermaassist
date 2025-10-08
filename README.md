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

**[📖 Complete Setup Guide](./docs/technical/setup-guide.md)** - Detailed instructions for configuring each provider

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

See **[Setup Guide](./docs/technical/setup-guide.md)** for detailed instructions.

## 🏗️ Architecture

Built with Next.js 15 App Router (standard structure with `app/` directory at root) and SOLID principles:

- **Single Responsibility**: Focused, maintainable components
- **Open/Closed**: Extensible without modification
- **Liskov Substitution**: Interchangeable providers
- **Interface Segregation**: Specific, minimal interfaces
- **Dependency Inversion**: Abstract over concrete implementations

**Project Structure:**
```
dermaassist/
├── app/                    # Next.js 15 App Router (pages & API routes)
├── src/                    # Application source code
│   ├── components/         # React components
│   ├── lib/               # Utilities and AI clients
│   └── hooks/             # Custom React hooks
├── docs/                   # Organized documentation (MECE framework)
├── prisma/                # Database schema
└── public/                # Static assets
```

**Key Design Patterns:**
- Factory Pattern for provider creation
- Repository Pattern for data access
- Template Method for shared behavior
- Strategy Pattern for AI provider selection

## 📚 Documentation

DermAssist documentation is organized using the **MECE framework** (Mutually Exclusive, Collectively Exhaustive) for comprehensive, non-overlapping coverage.

### Quick Navigation

**For Healthcare Providers:**
- **[Getting Started](./docs/user-guides/getting-started.md)** - First-time setup and onboarding
- **[Healthcare Provider Guide](./docs/user-guides/healthcare-provider-guide.md)** - Complete guide for medical professionals
- **[Submission Guide](./docs/user-guides/submission-guide.md)** - Step-by-step case submission

**For Developers:**
- **[Setup Guide](./docs/technical/setup-guide.md)** - Development environment and dependencies
- **[Database Guide](./docs/technical/database-guide.md)** - Prisma ORM, schema, and migrations
- **[Testing Guide](./docs/technical/testing-guide.md)** - Unit, integration, and E2E testing
- **[API Reference](./docs/technical/api-reference.md)** - Endpoints and integration

**For Designers:**
- **[Design Specification](./docs/design/figma-specification.md)** - Complete Figma Make design spec
- **[Design System](./docs/design/design-system.md)** - Components, colors, typography
- **[User Flows](./docs/design/user-flows.md)** - Interaction patterns

**Quick Reference:**
- **[AI Providers Reference](./docs/reference/ai-providers-reference.md)** - Comparison of all 6 AI providers
- **[Architecture Overview](./docs/reference/architecture-overview.md)** - System architecture and SOLID principles
- **[ICD-11 Quick Reference](./docs/reference/icd11-reference.md)** - Common dermatological codes

**[📂 Complete Documentation Index](./docs/README.md)** - Full MECE-organized documentation structure



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

See **[Testing Guide](./docs/technical/testing-guide.md)** for complete testing documentation.

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
