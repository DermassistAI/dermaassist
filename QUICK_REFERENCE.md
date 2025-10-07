# Quick Reference Card

## 🚀 Quick Setup (Choose One Provider)

### Option 1: Azure OpenAI
```bash
AZURE_OPENAI_API_KEY=sk-...
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
```

### Option 2: Google Gemini
```bash
GOOGLE_GEMINI_API_KEY=AIza...
GOOGLE_GEMINI_MODEL=gemini-1.5-flash
```

### Option 3: Groq
```bash
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile
```

## 📋 Common Commands

```bash
# Install and start
pnpm install && pnpm dev

# Build for production
pnpm build && pnpm start

# Test build
pnpm build
```

## 🔗 Quick Links

- **Setup Guide**: [MULTI_PROVIDER_SETUP.md](./MULTI_PROVIDER_SETUP.md)
- **Testing**: [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 📍 Get API Keys

| Provider | URL | Free Tier |
|----------|-----|-----------|
| Azure OpenAI | https://portal.azure.com | No |
| Google Gemini | https://aistudio.google.com | Yes (15 RPM) |
| Groq | https://console.groq.com | Yes |

## 🗄️ Optional: Supabase Setup

```bash
# 1. Add to .env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# 2. Run SQL from supabase/schema.sql in Supabase SQL Editor
```

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| "No AI provider configured" | Add provider env vars to .env |
| "API key is required" | Check API key in .env, no spaces |
| Build fails | Run `pnpm install` then `pnpm build` |
| Provider not working | Check API key permissions and model name |

## 🎯 Provider Priority

When multiple providers configured:
1. Google Gemini (if configured)
2. Groq (if configured)  
3. Azure OpenAI (default)

## 📊 Provider Comparison

| Feature | Azure | Gemini | Groq |
|---------|-------|--------|------|
| Speed | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cost | $$$ | $ | $$ |
| Free Tier | ❌ | ✅ | ✅ |
| Setup Time | 10 min | 5 min | 5 min |

## 🏗️ SOLID Principles Applied

- **S**ingle Responsibility - Each class has one job
- **O**pen/Closed - Extend without modifying
- **L**iskov Substitution - Providers are interchangeable
- **I**nterface Segregation - Focused interfaces
- **D**ependency Inversion - Depend on abstractions

## 🧪 Quick Test

```bash
# 1. Configure provider in .env
# 2. Start dev server
pnpm dev

# 3. Open browser
open http://localhost:3000/demo

# 4. Upload image and analyze
# 5. Check console: "Using AI provider: [Your Provider]"
```

## 📁 File Structure

```
src/lib/
  ├── providers/         # AI provider abstraction
  │   ├── types.ts      # Interfaces
  │   ├── BaseAIProvider.ts
  │   ├── AzureOpenAIProvider.ts
  │   ├── GoogleGeminiProvider.ts
  │   ├── GroqProvider.ts
  │   ├── AIProviderFactory.ts
  │   └── metadata.ts
  │
  └── supabase/         # Data storage
      ├── client.ts     # Supabase client
      └── repository.ts # Storage abstraction
```

## 💡 Quick Tips

1. **Start Simple**: Configure one provider first
2. **Use Free Tiers**: Test with Gemini or Groq
3. **Check Logs**: Console shows which provider is active
4. **Read Docs**: See MULTI_PROVIDER_SETUP.md for details
5. **Supabase Optional**: Works with file storage by default

## 🆘 Support

1. Check documentation in this repo
2. Review error messages in console
3. Verify API keys and permissions
4. Test with curl/Postman if needed

## 📝 Environment Template

```bash
# Copy to .env and fill in your values

# Choose ONE provider:

# Azure OpenAI
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini

# Google Gemini
# GOOGLE_GEMINI_API_KEY=
# GOOGLE_GEMINI_MODEL=gemini-1.5-flash

# Groq
# GROQ_API_KEY=
# GROQ_MODEL=llama-3.3-70b-versatile

# Optional: Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

**For detailed information, see the full guides:**
- [Complete Setup Guide](./MULTI_PROVIDER_SETUP.md)
- [Testing Procedures](./TESTING_GUIDE.md)
- [Architecture Details](./ARCHITECTURE.md)
