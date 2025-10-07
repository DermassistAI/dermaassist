# Database Guide

This guide covers all database-related operations for DermAssist using Prisma ORM.

## Table of Contents
1. [Overview](#overview)
2. [Schema](#schema)
3. [Setup](#setup)
4. [Common Operations](#common-operations)
5. [Migrations](#migrations)
6. [Seeding](#seeding)
7. [Best Practices](#best-practices)

## Overview

DermAssist uses PostgreSQL as the database and Prisma ORM for type-safe database operations.

**Key Features:**
- Type-safe queries with Prisma Client
- Automatic migrations
- Database seeding for testing
- Visual management with Prisma Studio
- Connection pooling support

## Schema

### Core Models

#### Provider
Healthcare providers with license verification.

```prisma
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
  
  submissions     Submission[]
  diagnoses       Diagnosis[]
}
```

#### Submission
De-identified patient cases with AI analysis.

```prisma
model Submission {
  id              String   @id @default(cuid())
  providerId      String
  imageUrl        String
  imageHash       String   @unique
  aiProvider      String
  aiModel         String
  aiResponse      Json?
  status          SubmissionStatus @default(PENDING)
  createdAt       DateTime @default(now())
  
  provider        Provider @relation(fields: [providerId], references: [id])
  diagnoses       Diagnosis[]
}

enum SubmissionStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  UNDER_REVIEW
  APPROVED_FOR_PRACTICE
}
```

#### Diagnosis
Practice feed diagnostic attempts and consensus building.

```prisma
model Diagnosis {
  id            String   @id @default(cuid())
  submissionId  String
  providerId    String
  icd11Code     String
  notes         String?
  confidence    Float?
  createdAt     DateTime @default(now())
  
  submission    Submission @relation(fields: [submissionId], references: [id])
  provider      Provider @relation(fields: [providerId], references: [id])
}
```

#### ModelHealthCheck
System health monitoring logs.

```prisma
model ModelHealthCheck {
  id            String   @id @default(cuid())
  provider      String
  model         String
  status        String
  responseTime  Float
  errorMessage  String?
  checkedAt     DateTime @default(now())
}
```

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

This automatically runs `prisma generate` to create the Prisma Client.

### 2. Configure Database URL

Add to `.env`:

```bash
# For Supabase
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# For local PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/dermassist"
```

### 3. Push Schema (Development)

For quick schema updates without migrations:

```bash
pnpm db:push
```

### 4. Run Migrations (Production)

For version-controlled schema changes:

```bash
pnpm db:migrate
```

## Common Operations

### Generate Prisma Client

After schema changes:

```bash
pnpm db:generate
```

### Open Prisma Studio

Visual database browser:

```bash
pnpm db:studio
```

Access at http://localhost:5555

### Seed Database

Populate with test data:

```bash
pnpm db:seed
```

### Format Schema

Auto-format prisma/schema.prisma:

```bash
pnpm db:format
```

### Validate Schema

Check for errors:

```bash
pnpm db:validate
```

## Migrations

### Create Migration

```bash
pnpm db:migrate
# Enter migration name when prompted
```

### Deploy Migrations (Production)

```bash
pnpm db:migrate:deploy
```

### Reset Database

**Warning**: Deletes all data!

```bash
pnpm db:migrate:reset
```

### Migration Best Practices

1. **Always test migrations** on a development database first
2. **Create backups** before running migrations in production
3. **Use descriptive names** for migrations (e.g., "add-consent-fields")
4. **Review SQL** generated in `prisma/migrations/` before applying
5. **Never edit** migration files after they've been applied

## Seeding

### Seed Script Location

`prisma/seed.ts` contains the seeding logic.

### Example Usage

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test provider
  const provider = await prisma.provider.create({
    data: {
      email: 'dr.smith@example.com',
      licenseNumber: 'MD-12345-CA',
      licenseState: 'California',
      licenseCountry: 'USA',
      licenseExpiry: new Date('2025-12-31'),
      licenseVerified: true,
    },
  })
  
  console.log('Created provider:', provider)
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

### Run Seeding

```bash
pnpm db:seed
```

## Best Practices

### 1. Type Safety

Always use Prisma Client for type-safe queries:

```typescript
// ✅ Good - Type-safe
const provider = await prisma.provider.findUnique({
  where: { email: 'dr.smith@example.com' }
})

// ❌ Bad - Raw SQL (lose type safety)
await prisma.$queryRaw`SELECT * FROM Provider WHERE email = 'dr.smith@example.com'`
```

### 2. Relations

Use `include` to fetch related data:

```typescript
const submission = await prisma.submission.findUnique({
  where: { id: submissionId },
  include: {
    provider: true,
    diagnoses: true,
  }
})
```

### 3. Transactions

Use transactions for multiple operations:

```typescript
await prisma.$transaction([
  prisma.submission.create({ data: submissionData }),
  prisma.diagnosis.create({ data: diagnosisData }),
])
```

### 4. Error Handling

Always handle Prisma errors:

```typescript
try {
  await prisma.provider.create({ data: providerData })
} catch (error) {
  if (error.code === 'P2002') {
    console.error('Unique constraint violation')
  }
  throw error
}
```

### 5. Connection Pooling

For serverless environments, use connection pooling:

```bash
# In .env
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
```

## Troubleshooting

### Migration Conflicts

If you encounter migration conflicts:

1. Pull latest changes
2. Reset your local database: `pnpm db:migrate:reset`
3. Pull schema from database: `pnpm db:pull`
4. Resolve conflicts manually
5. Create new migration: `pnpm db:migrate`

### Type Generation Issues

If types are out of sync:

```bash
pnpm db:generate
```

Then restart your TypeScript server in VS Code (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

### Connection Issues

Check:
1. DATABASE_URL is correctly set
2. Database is running
3. Firewall allows connections
4. Credentials are correct

---

For more details, see the [Prisma Documentation](https://www.prisma.io/docs).
