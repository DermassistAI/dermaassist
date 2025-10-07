# DermAssist Setup Guide

This comprehensive guide covers all aspects of setting up DermAssist, including AI providers, authentication systems, and development environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [AI Provider Configuration](#ai-provider-configuration)
4. [Authentication Setup](#authentication-setup)
5. [Database Configuration](#database-configuration)
6. [Development Environment](#development-environment)
7. [Testing Setup](#testing-setup)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: Version 18.0.0 or higher
- **pnpm**: Version 8.0.0 or higher (package manager)
- **Git**: Latest version
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

### Recommended Tools

- **Docker**: For local Supabase development
- **Postman** or **Insomnia**: For API testing
- **pgAdmin** or **TablePlus**: For database management

### System Requirements

- **RAM**: Minimum 8GB, recommended 16GB
- **Storage**: At least 5GB free space
- **OS**: macOS, Linux, or Windows with WSL2

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/DermassistAI/dermaassist.git
cd dermaassist
```

### 2. Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

---

## AI Provider Configuration

DermAssist supports multiple AI providers. You need to configure **at least one** provider for the application to function.

### Supported AI Providers

1. **Claude (Anthropic)** - Claude Sonnet 4.5 and other models
2. **Google Gemini** - Gemini 1.5 Flash, Gemini 1.5 Pro, Gemini 2.0 Flash
3. **OpenAI** - GPT-5, GPT-5 Mini (GPT-4o, GPT-4o-mini for current availability)
4. **Azure OpenAI** - Enterprise GPT models
5. **Groq** - Ultra-fast inference with LLaMA and Mixtral
6. **Qwen** - Alibaba Cloud's multilingual model

### Provider Configuration

#### Option 1: Claude (Anthropic)

**Get API Key**: https://console.anthropic.com/

**Add to `.env`**:
```bash
# Claude Configuration
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
CLAUDE_MODEL=claude-3-5-sonnet-20241022  # or claude-3-opus-20240229
CLAUDE_MAX_TOKENS=4096
CLAUDE_TEMPERATURE=0.3
```

**Available Models**:
- `claude-3-5-sonnet-20241022` (Claude Sonnet 3.5 - recommended)
- `claude-3-opus-20240229` (Claude Opus 3)
- `claude-3-sonnet-20240229` (Claude Sonnet 3)
- `claude-3-haiku-20240307` (Claude Haiku 3 - fastest)

**Cost Considerations**:
- Sonnet 3.5: $3 per million input tokens, $15 per million output tokens
- Best for: Complex clinical reasoning, detailed analysis

#### Option 2: Google Gemini

**Get API Key**: https://aistudio.google.com/app/apikey

**Add to `.env`**:
```bash
# Google Gemini Configuration
GOOGLE_GEMINI_API_KEY=AIzaSyxxxxx
GEMINI_MODEL=gemini-2.0-flash-exp  # or gemini-1.5-pro, gemini-1.5-flash
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.3
```

**Available Models**:
- `gemini-2.0-flash-exp` (Latest, experimental, fastest)
- `gemini-1.5-pro` (Best quality)
- `gemini-1.5-flash` (Fast and cost-effective)

**Cost Considerations**:
- Flash: Very affordable, great for high-volume
- Pro: More expensive but higher quality
- Best for: Cost-effective analysis, multilingual support

#### Option 3: OpenAI

**Get API Key**: https://platform.openai.com/api-keys

**Add to `.env`**:
```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxx
OPENAI_MODEL=gpt-4o  # or gpt-4o-mini, gpt-4-turbo
OPENAI_MAX_TOKENS=4096
OPENAI_TEMPERATURE=0.3
```

**Available Models**:
- `gpt-4o` (GPT-4 Optimized - current best)
- `gpt-4o-mini` (Smaller, faster, cheaper)
- `gpt-4-turbo` (High performance)
- `gpt-3.5-turbo` (Legacy, not recommended)

**Note**: GPT-5 and GPT-5 Mini will be supported when released by OpenAI.

**Cost Considerations**:
- GPT-4o: $5 per million input tokens, $15 per million output tokens
- GPT-4o-mini: $0.15 per million input tokens, $0.60 per million output tokens
- Best for: Comprehensive analysis, structured output

#### Option 4: Azure OpenAI

**Get Credentials**: https://portal.azure.com

**Add to `.env`**:
```bash
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your_azure_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

**Setup Steps**:
1. Create an Azure account
2. Create an Azure OpenAI resource
3. Deploy a model (e.g., gpt-4o-mini)
4. Copy API key and endpoint

**Cost Considerations**:
- Enterprise-grade security and compliance
- Pay-as-you-go or commitment-based pricing
- Best for: Healthcare organizations with Azure infrastructure

#### Option 5: Groq

**Get API Key**: https://console.groq.com/keys

**Add to `.env`**:
```bash
# Groq Configuration
GROQ_API_KEY=gsk_xxxxx
GROQ_MODEL=llama-3.3-70b-versatile  # or mixtral-8x7b-32768
GROQ_MAX_TOKENS=4096
GROQ_TEMPERATURE=0.3
```

**Available Models**:
- `llama-3.3-70b-versatile` (Latest LLaMA 3.3)
- `llama-3.1-70b-versatile` (LLaMA 3.1)
- `mixtral-8x7b-32768` (Mixtral - long context)

**Cost Considerations**:
- Extremely fast inference (< 1 second)
- Competitive pricing
- Best for: Real-time applications, high throughput

#### Option 6: Qwen (via API Provider)

**Note**: Qwen models are available through various API providers like Alibaba Cloud, Hugging Face, or self-hosted.

**Example for Alibaba Cloud**:
```bash
# Qwen Configuration
QWEN_API_KEY=your_api_key
QWEN_ENDPOINT=https://dashscope.aliyuncs.com/api/v1
QWEN_MODEL=qwen-turbo  # or qwen-plus, qwen-max
QWEN_MAX_TOKENS=4096
QWEN_TEMPERATURE=0.3
```

**Available Models**:
- `qwen-max` (Best quality)
- `qwen-plus` (Balanced)
- `qwen-turbo` (Fastest)

**Cost Considerations**:
- Excellent multilingual support (especially Chinese)
- Best for: International deployments, multilingual analysis

### Multi-Provider Setup

You can configure **multiple providers** simultaneously. The application will allow users to select their preferred model during submission.

**Example `.env` with multiple providers**:
```bash
# Claude
ANTHROPIC_API_KEY=sk-ant-xxxxx
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Google Gemini
GOOGLE_GEMINI_API_KEY=AIzaSyxxxxx
GEMINI_MODEL=gemini-2.0-flash-exp

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxx
OPENAI_MODEL=gpt-4o

# Azure OpenAI
AZURE_OPENAI_API_KEY=azure_key
AZURE_OPENAI_ENDPOINT=https://resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini

# Groq
GROQ_API_KEY=gsk_xxxxx
GROQ_MODEL=llama-3.3-70b-versatile
```

### Provider Priority & Fallback

Configure provider priority for automatic fallback:

```bash
# Provider priority (comma-separated)
AI_PROVIDER_PRIORITY=claude,gemini,openai,groq,azure-openai

# Enable automatic fallback
AI_AUTO_FALLBACK=true

# Max retries per provider
AI_MAX_RETRIES=2
```

### Testing Provider Configuration

```bash
# Test all configured providers
pnpm test:providers

# Test specific provider
pnpm test:provider claude
pnpm test:provider gemini
pnpm test:provider openai
```

---

## Authentication Setup

DermAssist supports **two authentication providers** to offer flexibility for different deployment scenarios:

1. **Clerk** - Modern, developer-friendly authentication
2. **Keycloak** - Enterprise-grade, self-hosted identity management

You can use **either one or both** simultaneously.

### Option 1: Clerk Authentication

#### Why Clerk?

- 🚀 Quick setup (< 5 minutes)
- 🎨 Pre-built UI components
- 📱 Built-in social login (Google, GitHub, etc.)
- 🔐 MFA/2FA support
- 💳 Free tier: 10,000 MAU (Monthly Active Users)

#### Setup Steps

**1. Create Clerk Account**

Visit: https://clerk.com/

1. Sign up for a free account
2. Create a new application
3. Choose authentication methods (Email, Phone, Social)

**2. Get API Keys**

In Clerk Dashboard:
- Go to **API Keys** section
- Copy your keys

**3. Configure Environment Variables**

Add to `.env`:
```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Webhook secret (for user events)
CLERK_WEBHOOK_SECRET=whsec_xxxxx
```

**4. Install Clerk SDK**

```bash
pnpm add @clerk/nextjs
```

**5. Configure Clerk in Next.js**

The application already includes Clerk setup. Verify in `app/layout.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

**6. Protect Routes**

Create middleware to protect admin routes:

```typescript
// middleware.ts (already configured)
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/admin/:path*',
    '/manage/:path*',
    '/api/admin/:path*',
  ],
}
```

**7. Role-Based Access Control (RBAC)**

Configure roles in Clerk Dashboard:
- **User**: Can submit data
- **Researcher**: Can view analytics
- **Admin**: Full access to management portal

Add roles to users via Clerk Dashboard or API.

**8. Test Clerk Integration**

```bash
# Start dev server
pnpm dev

# Visit sign-in page
open http://localhost:3000/sign-in

# Create test user
# Verify authentication flow
```

#### Clerk Advanced Configuration

**Enable Social Providers**:

In Clerk Dashboard → **User & Authentication** → **Social Connections**:
- ✓ Google
- ✓ GitHub
- ✓ Microsoft Azure AD

**Customize UI**:

```bash
# Add to .env for custom branding
NEXT_PUBLIC_CLERK_APPEARANCE={
  "variables": {
    "colorPrimary": "#C87941",
    "colorText": "#3D2817"
  }
}
```

**Webhooks for User Events**:

1. In Clerk Dashboard → **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`
4. Copy webhook secret

### Option 2: Keycloak Authentication

#### Why Keycloak?

- 🏢 Enterprise-grade, open-source
- 🔒 Self-hosted (full data control)
- 🌍 LDAP/Active Directory integration
- 🔐 Advanced RBAC and policies
- 🆓 Completely free, no user limits

#### Setup Steps

**1. Install Keycloak**

**Option A: Docker (Recommended for Development)**

```bash
# Create docker-compose.yml
cat > docker-compose.keycloak.yml << EOF
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: password
    volumes:
      - keycloak_db:/var/lib/postgresql/data

  keycloak:
    image: quay.io/keycloak/keycloak:23.0
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: password
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - "8080:8080"
    command: start-dev
    depends_on:
      - postgres

volumes:
  keycloak_db:
EOF

# Start Keycloak
docker-compose -f docker-compose.keycloak.yml up -d
```

**Option B: Standalone Server**

Download from: https://www.keycloak.org/downloads

```bash
# Extract and run
unzip keycloak-23.0.0.zip
cd keycloak-23.0.0
bin/kc.sh start-dev
```

**2. Initial Configuration**

1. Visit: http://localhost:8080
2. Login with admin/admin
3. Create a new realm: `dermassist`

**3. Create Client**

In Keycloak Admin Console:

1. Go to **Clients** → **Create Client**
2. Settings:
   - **Client ID**: `dermassist-app`
   - **Client Protocol**: `openid-connect`
   - **Access Type**: `confidential`
   - **Valid Redirect URIs**: `http://localhost:3000/*`
   - **Web Origins**: `http://localhost:3000`
3. Save and copy **Client Secret** from **Credentials** tab

**4. Create Roles**

1. Go to **Realm Roles** → **Create Role**
2. Create roles:
   - `user` (default role)
   - `researcher`
   - `admin`

**5. Configure Environment Variables**

Add to `.env`:
```bash
# Keycloak Configuration
KEYCLOAK_REALM=dermassist
KEYCLOAK_CLIENT_ID=dermassist-app
KEYCLOAK_CLIENT_SECRET=your_client_secret
KEYCLOAK_ISSUER=http://localhost:8080/realms/dermassist
KEYCLOAK_URL=http://localhost:8080

# NextAuth configuration for Keycloak
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_generate_with_openssl

# Callback URLs
KEYCLOAK_REDIRECT_URI=http://localhost:3000/api/auth/callback/keycloak
```

**6. Install NextAuth.js**

```bash
pnpm add next-auth
```

**7. Configure NextAuth**

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.roles = account.realm_access?.roles || []
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.roles = token.roles
      return session
    },
  },
})

export { handler as GET, handler as POST }
```

**8. Test Keycloak Integration**

```bash
# Start dev server
pnpm dev

# Visit sign-in page
open http://localhost:3000/api/auth/signin

# Sign in with Keycloak
# Verify authentication flow
```

#### Keycloak Advanced Configuration

**LDAP Integration**:

In Keycloak Admin Console:
1. Go to **User Federation** → **Add Provider** → **LDAP**
2. Configure LDAP connection details
3. Sync users from Active Directory

**Custom Login Theme**:

```bash
# Create custom theme directory
mkdir -p keycloak/themes/dermassist/login

# Add custom CSS and templates
# See: https://www.keycloak.org/docs/latest/server_development/#_themes
```

### Dual Authentication Setup

To support **both Clerk and Keycloak**:

```bash
# Enable both providers
AUTH_PROVIDER=clerk,keycloak  # comma-separated

# Default provider
AUTH_DEFAULT_PROVIDER=clerk

# Allow users to choose
AUTH_ALLOW_PROVIDER_SELECTION=true
```

### Role-Based Access Control (RBAC)

#### Defining Roles

```typescript
// src/lib/auth/roles.ts
export enum Role {
  USER = 'user',           // Can submit data
  RESEARCHER = 'researcher', // Can view analytics
  ADMIN = 'admin',         // Full access
}

export const ROLE_PERMISSIONS = {
  [Role.USER]: ['submit:create', 'submit:read'],
  [Role.RESEARCHER]: ['submit:read', 'analytics:read'],
  [Role.ADMIN]: ['*'], // All permissions
}
```

#### Protecting Routes

```typescript
// Example: Protect admin page
import { checkRole } from '@/lib/auth/rbac'

export default async function AdminPage() {
  await checkRole(Role.ADMIN)
  
  return <AdminDashboard />
}
```

### Authentication Testing

See [TESTING.md](./TESTING.md) for comprehensive authentication tests.

Quick test commands:
```bash
# Test Clerk authentication
pnpm test:auth:clerk

# Test Keycloak authentication
pnpm test:auth:keycloak

# Test RBAC
pnpm test:auth:rbac
```

---

## Database Configuration

### Supabase Setup

**1. Create Supabase Project**

Visit: https://supabase.com

1. Sign up / Sign in
2. Create new project
3. Choose region (closest to your users)
4. Set database password

**2. Get API Keys**

In Supabase Dashboard:
- Go to **Settings** → **API**
- Copy:
  - **Project URL**
  - **anon public key**
  - **service_role secret** (for server-side)

**3. Configure Environment Variables**

Add to `.env`:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database direct connection (optional, for migrations)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

**4. Run Database Migrations**

```bash
# Initialize Supabase
pnpm supabase init

# Run migrations
pnpm supabase db push
```

Or manually run the schema in Supabase SQL Editor:

```bash
# Copy schema to clipboard
cat supabase/schema.sql | pbcopy

# Paste and run in Supabase SQL Editor
```

**5. Enable Row Level Security (RLS)**

Already configured in schema. Verify in Supabase Dashboard:
- Go to **Authentication** → **Policies**
- Check that RLS is enabled on all tables

**6. Storage Configuration**

For image uploads:

```bash
# In Supabase Dashboard → Storage
# Create bucket: 'submissions'
# Make it public or configure signed URLs
```

Add to `.env`:
```bash
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=submissions
```

### Alternative: PostgreSQL Direct

If not using Supabase:

```bash
# PostgreSQL Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dermassist
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

Run migrations:
```bash
pnpm prisma migrate dev
```

---

## Prisma ORM Setup

DermAssist uses **Prisma ORM** for type-safe database access and schema management. Prisma provides a modern database toolkit with auto-completion, type-safety, and migrations.

### Why Prisma?

- **Type-Safety**: Auto-generated TypeScript types from your schema
- **Migrations**: Version-controlled database schema changes
- **Intuitive API**: Easy-to-use query builder
- **Multi-Database**: Works with PostgreSQL, MySQL, SQLite, and more
- **Introspection**: Generate schema from existing database

### Initial Setup

**1. Initialize Prisma**

If not already initialized:

```bash
# Initialize Prisma in your project
pnpm prisma init

# This creates:
# - prisma/schema.prisma (database schema)
# - .env file with DATABASE_URL
```

**2. Configure Database Connection**

Update your `.env` file:

```bash
# For Supabase
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?pgbouncer=true"

# For local PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/dermassist"

# For production with connection pooling
DATABASE_URL="postgresql://user:password@host:5432/database?connection_limit=10&pool_timeout=20"
```

**3. Define Your Schema**

Edit `prisma/schema.prisma`:

```prisma
// This is your Prisma schema file
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Healthcare Provider Model
model Provider {
  id              String   @id @default(cuid())
  email           String   @unique
  licenseNumber   String   @unique
  licenseState    String
  licenseCountry  String
  licenseExpiry   DateTime
  licenseVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  submissions     Submission[]
  diagnoses       Diagnosis[]
  
  @@index([licenseNumber])
  @@index([email])
}

// Patient Case Submission Model
model Submission {
  id              String   @id @default(cuid())
  providerId      String
  provider        Provider @relation(fields: [providerId], references: [id])
  
  // De-identified patient data
  imageUrl        String
  imageHash       String   @unique // For duplicate detection
  
  // Clinical information
  duration        String? // How long patient has had condition
  symptoms        String?
  treatments      String?
  
  // AI Analysis
  aiProvider      String // claude, openai, gemini, etc.
  aiModel         String
  aiResponse      Json? // Structured AI response
  icd11Code       String?
  confidence      Float?
  
  // Metadata
  status          SubmissionStatus @default(PENDING)
  qualityScore    Float?
  reviewedBy      String?
  reviewedAt      DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  diagnoses       Diagnosis[]
  
  @@index([providerId])
  @@index([status])
  @@index([createdAt])
}

enum SubmissionStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  UNDER_REVIEW
  APPROVED_FOR_PRACTICE
}

// Practice Feed Diagnosis Model
model Diagnosis {
  id            String   @id @default(cuid())
  submissionId  String
  submission    Submission @relation(fields: [submissionId], references: [id])
  providerId    String
  provider      Provider @relation(fields: [providerId], references: [id])
  
  icd11Code     String
  notes         String?
  confidence    Float?
  
  createdAt     DateTime @default(now())
  
  @@index([submissionId])
  @@index([providerId])
  @@index([icd11Code])
}

// Model Health Check Log
model ModelHealthCheck {
  id            String   @id @default(cuid())
  provider      String // claude, openai, etc.
  model         String
  status        String // operational, degraded, down
  responseTime  Float // in milliseconds
  errorMessage  String?
  checkedAt     DateTime @default(now())
  
  @@index([provider, model])
  @@index([checkedAt])
}
```

**4. Generate Prisma Client**

After defining your schema:

```bash
# Generate TypeScript types and Prisma Client
pnpm prisma generate

# This creates node_modules/@prisma/client
```

**5. Create and Run Migrations**

```bash
# Create a new migration
pnpm prisma migrate dev --name init

# This will:
# 1. Create SQL migration files in prisma/migrations/
# 2. Apply migration to database
# 3. Generate Prisma Client

# For production
pnpm prisma migrate deploy
```

### Common Prisma Commands

#### Development

```bash
# Generate Prisma Client (after schema changes)
pnpm prisma generate

# Create and apply migration
pnpm prisma migrate dev --name add_new_field

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# View and manage database with Prisma Studio
pnpm prisma studio
```

#### Database Management

```bash
# Push schema changes without migration (useful for prototyping)
pnpm prisma db push

# Pull schema from existing database
pnpm prisma db pull

# Seed database with test data
pnpm prisma db seed
```

#### Production

```bash
# Apply migrations in production
pnpm prisma migrate deploy

# Validate schema
pnpm prisma validate

# Format schema file
pnpm prisma format
```

### Using Prisma Client in Your Code

**1. Create a Prisma Client Instance**

Create `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

// Prevent multiple instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

**2. CRUD Operations Examples**

```typescript
import { prisma } from '@/lib/prisma'

// Create a provider
async function createProvider(data: {
  email: string
  licenseNumber: string
  licenseState: string
  licenseCountry: string
  licenseExpiry: Date
}) {
  return await prisma.provider.create({
    data,
  })
}

// Find provider by email
async function getProviderByEmail(email: string) {
  return await prisma.provider.findUnique({
    where: { email },
    include: { submissions: true }, // Include related submissions
  })
}

// Create submission
async function createSubmission(data: {
  providerId: string
  imageUrl: string
  imageHash: string
  aiProvider: string
  aiModel: string
}) {
  return await prisma.submission.create({
    data: {
      ...data,
      status: 'PENDING',
    },
  })
}

// Get submissions with filters
async function getSubmissions(filters: {
  status?: string
  providerId?: string
  skip?: number
  take?: number
}) {
  return await prisma.submission.findMany({
    where: {
      status: filters.status,
      providerId: filters.providerId,
    },
    include: {
      provider: true,
      diagnoses: true,
    },
    skip: filters.skip || 0,
    take: filters.take || 10,
    orderBy: { createdAt: 'desc' },
  })
}

// Update submission with AI response
async function updateSubmissionWithAI(
  id: string,
  aiResponse: any,
  icd11Code: string,
  confidence: number
) {
  return await prisma.submission.update({
    where: { id },
    data: {
      aiResponse,
      icd11Code,
      confidence,
      status: 'COMPLETED',
    },
  })
}

// Count submissions by status
async function getSubmissionStats() {
  const stats = await prisma.submission.groupBy({
    by: ['status'],
    _count: true,
  })
  return stats
}

// Get practice feed cases (approved submissions)
async function getPracticeFeedCases(limit = 20) {
  return await prisma.submission.findMany({
    where: {
      status: 'APPROVED_FOR_PRACTICE',
    },
    include: {
      diagnoses: {
        include: {
          provider: {
            select: {
              id: true,
              // Don't include identifying info
            },
          },
        },
      },
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}

// Add diagnosis to practice case
async function addDiagnosis(data: {
  submissionId: string
  providerId: string
  icd11Code: string
  notes?: string
  confidence?: number
}) {
  return await prisma.diagnosis.create({
    data,
  })
}

// Get consensus on a case
async function getConsensus(submissionId: string) {
  const diagnoses = await prisma.diagnosis.findMany({
    where: { submissionId },
    include: {
      provider: {
        select: { id: true },
      },
    },
  })

  // Calculate consensus
  const counts = diagnoses.reduce((acc, d) => {
    acc[d.icd11Code] = (acc[d.icd11Code] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const total = diagnoses.length
  const consensus = Object.entries(counts).map(([code, count]) => ({
    icd11Code: code,
    count,
    percentage: (count / total) * 100,
  }))

  return consensus.sort((a, b) => b.percentage - a.percentage)
}
```

**3. Using in API Routes**

Example `app/api/submissions/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const submission = await prisma.submission.create({
      data: {
        providerId: body.providerId,
        imageUrl: body.imageUrl,
        imageHash: body.imageHash,
        aiProvider: body.aiProvider,
        aiModel: body.aiModel,
        status: 'PROCESSING',
      },
    })

    return NextResponse.json(submission)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const submissions = await prisma.submission.findMany({
      where: status ? { status } : {},
      include: {
        provider: {
          select: {
            email: true,
            licenseNumber: true,
          },
        },
      },
      take: 50,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
```

### Database Seeding

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test providers
  const provider1 = await prisma.provider.create({
    data: {
      email: 'dr.smith@example.com',
      licenseNumber: 'MD-12345',
      licenseState: 'CA',
      licenseCountry: 'USA',
      licenseExpiry: new Date('2025-12-31'),
      licenseVerified: true,
    },
  })

  const provider2 = await prisma.provider.create({
    data: {
      email: 'dr.jones@example.com',
      licenseNumber: 'MD-67890',
      licenseState: 'NY',
      licenseCountry: 'USA',
      licenseExpiry: new Date('2026-06-30'),
      licenseVerified: true,
    },
  })

  // Create test submissions
  await prisma.submission.create({
    data: {
      providerId: provider1.id,
      imageUrl: 'https://example.com/image1.jpg',
      imageHash: 'hash1',
      aiProvider: 'claude',
      aiModel: 'claude-3-5-sonnet-20241022',
      status: 'APPROVED_FOR_PRACTICE',
      icd11Code: 'L20.0',
      confidence: 0.85,
    },
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed"
  }
}
```

Run seeding:

```bash
pnpm db:seed
```

### Prisma Studio

Launch Prisma Studio to visually manage your database:

```bash
pnpm prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- View all tables and data
- Add, edit, and delete records
- Run queries visually
- Explore relationships

### Migration Best Practices

1. **Always create migrations for schema changes**:
   ```bash
   pnpm prisma migrate dev --name descriptive_name
   ```

2. **Never edit migration files manually** - create new migrations instead

3. **Test migrations locally** before deploying to production

4. **Back up production database** before running migrations

5. **Use meaningful migration names**:
   - ✅ `add_provider_license_fields`
   - ✅ `create_diagnosis_table`
   - ❌ `migration_1`
   - ❌ `update`

### Troubleshooting

**Issue: "Prisma Client not found"**

Solution:
```bash
pnpm prisma generate
```

**Issue: "Database connection failed"**

Solution:
- Check `DATABASE_URL` in `.env`
- Verify database is running
- Check network connectivity
- Ensure connection string format is correct

**Issue: "Migration failed"**

Solution:
```bash
# Reset database (WARNING: deletes data)
pnpm prisma migrate reset

# Or manually resolve conflicts
pnpm prisma migrate resolve --applied <migration_name>
```

**Issue: "Type errors after schema change"**

Solution:
```bash
# Regenerate Prisma Client
pnpm prisma generate

# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Production Deployment

**1. Set DATABASE_URL in production environment**

**2. Run migrations**:
```bash
pnpm prisma migrate deploy
```

**3. Generate Prisma Client**:
```bash
pnpm prisma generate
```

**4. Optimize for production**:

Set in `.env`:
```bash
# Enable connection pooling
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"

# For serverless (e.g., Vercel)
DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=1"
```

### Additional Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Prisma Examples**: https://github.com/prisma/prisma-examples
- **Prisma Discord**: https://pris.ly/discord
- **Schema Reference**: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference

---

## Development Environment

### Environment Variables

Complete `.env` example:

```bash
# ============================================
# APPLICATION
# ============================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DermAssist

# ============================================
# AI PROVIDERS
# ============================================
# Claude
ANTHROPIC_API_KEY=sk-ant-xxxxx
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Google Gemini
GOOGLE_GEMINI_API_KEY=AIzaSyxxxxx
GEMINI_MODEL=gemini-2.0-flash-exp

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxx
OPENAI_MODEL=gpt-4o

# Azure OpenAI
AZURE_OPENAI_API_KEY=azure_key
AZURE_OPENAI_ENDPOINT=https://resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini

# Groq
GROQ_API_KEY=gsk_xxxxx
GROQ_MODEL=llama-3.3-70b-versatile

# Provider settings
AI_PROVIDER_PRIORITY=claude,gemini,openai,groq,azure-openai
AI_AUTO_FALLBACK=true
AI_MAX_RETRIES=2

# ============================================
# AUTHENTICATION
# ============================================
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx

# Keycloak
KEYCLOAK_REALM=dermassist
KEYCLOAK_CLIENT_ID=dermassist-app
KEYCLOAK_CLIENT_SECRET=client_secret
KEYCLOAK_ISSUER=http://localhost:8080/realms/dermassist

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# ============================================
# DATABASE
# ============================================
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key
SUPABASE_SERVICE_ROLE_KEY=service_role_key

# Or PostgreSQL direct
DATABASE_URL=postgresql://user:password@localhost:5432/dermassist

# ============================================
# STORAGE
# ============================================
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=submissions
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/heic,image/webp

# ============================================
# SECURITY
# ============================================
# Rate limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Encryption
ENCRYPTION_KEY=generate_with_openssl_rand_hex_32

# ============================================
# MONITORING & LOGGING
# ============================================
LOG_LEVEL=info
ENABLE_ANALYTICS=true

# Sentry (optional)
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# ============================================
# FEATURE FLAGS
# ============================================
ENABLE_ADMIN_PORTAL=true
ENABLE_CHAT_INTERFACE=true
ENABLE_ICD11_INTEGRATION=true
ENABLE_MULTI_PROVIDER=true
```

### Development Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm dev:turbo        # Start with Turbopack (faster)

# Building
pnpm build            # Production build
pnpm start            # Start production server

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # With coverage report

# Linting & Formatting
pnpm lint             # ESLint
pnpm lint:fix         # Auto-fix issues
pnpm format           # Prettier
pnpm format:check     # Check formatting

# Type Checking
pnpm type-check       # TypeScript check

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Prisma Studio
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database

# Providers
pnpm test:providers   # Test all AI providers
pnpm test:provider    # Test specific provider
```

### IDE Configuration

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## Testing Setup

See [TESTING.md](./TESTING.md) for complete testing documentation.

### Quick Test Setup

```bash
# Install test dependencies (already in package.json)
pnpm install

# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

---

## Production Deployment

### Environment Checklist

Before deploying:

- [ ] All API keys configured
- [ ] Database migrations run
- [ ] Authentication providers configured
- [ ] Storage buckets created
- [ ] Environment variables set in hosting platform
- [ ] Rate limiting configured
- [ ] Monitoring enabled
- [ ] Backup strategy in place

### Vercel Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add ANTHROPIC_API_KEY
vercel env add CLERK_SECRET_KEY
# ... add all env vars
```

### Docker Deployment

```bash
# Build Docker image
docker build -t dermassist .

# Run container
docker run -p 3000:3000 --env-file .env dermassist
```

### Health Checks

Configure health check endpoint:

```bash
# Health check URL
GET /api/health

# Response
{
  "status": "healthy",
  "version": "1.0.0",
  "providers": {
    "claude": "operational",
    "gemini": "operational",
    "openai": "operational"
  },
  "database": "connected",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

---

## Troubleshooting

### Common Issues

#### 1. "No AI provider configured" Error

**Solution**:
- Check `.env` file exists
- Verify at least one provider has API key set
- Restart dev server after changing `.env`

#### 2. Clerk authentication not working

**Solution**:
- Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Check Clerk dashboard for correct URLs
- Clear browser cookies and cache

#### 3. Keycloak connection refused

**Solution**:
- Ensure Keycloak is running: `docker ps`
- Check port 8080 is not in use
- Verify realm name matches `.env`

#### 4. Supabase connection failed

**Solution**:
- Verify project URL and anon key
- Check RLS policies are not too restrictive
- Ensure service role key for server-side operations

#### 5. Image upload fails

**Solution**:
- Check file size limit (default 10MB)
- Verify file type is allowed
- Check storage bucket permissions

### Debug Mode

Enable debug logging:

```bash
# Add to .env
LOG_LEVEL=debug
DEBUG=dermassist:*
```

View logs:
```bash
pnpm dev | pnpm winston
```

### Getting Help

- **GitHub Issues**: https://github.com/DermassistAI/dermaassist/issues
- **Discussions**: https://github.com/DermassistAI/dermaassist/discussions
- **Email**: support@dermassist.com

---

## Best Practices

### Security

1. **Never commit `.env` file**
2. **Rotate API keys regularly**
3. **Use service accounts for production**
4. **Enable rate limiting**
5. **Implement CORS properly**
6. **Keep dependencies updated**

### Performance

1. **Enable caching for AI responses**
2. **Optimize images before upload**
3. **Use CDN for static assets**
4. **Implement pagination for large datasets**
5. **Monitor API usage and costs**

### Development Workflow

1. **Create feature branches**
2. **Write tests before code (TDD)**
3. **Run linter before committing**
4. **Keep commits atomic and descriptive**
5. **Request code reviews**

---

## Next Steps

After setup:

1. ✅ Complete authentication flow
2. ✅ Test AI provider integration
3. ✅ Set up admin portal access
4. ✅ Configure monitoring
5. ✅ Run test suite
6. ✅ Deploy to staging
7. ✅ Conduct security audit
8. ✅ Launch! 🚀

---

## Appendix

### Generating Secrets

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate encryption key
openssl rand -hex 32

# Generate webhook secret
openssl rand -base64 32
```

### Useful Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Clerk Documentation**: https://clerk.com/docs
- **Keycloak Documentation**: https://www.keycloak.org/documentation
- **Supabase Documentation**: https://supabase.com/docs
- **ax-llm Documentation**: https://github.com/ax-llm/ax

### License

This project is licensed under the [LICENSE NAME] - see LICENSE file for details.

---

**Last Updated**: 2025-01-01
**Version**: 1.0.0
**Maintainers**: DermAssist Team
