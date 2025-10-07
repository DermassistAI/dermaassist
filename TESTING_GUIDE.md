# Testing and Validation Guide

This document provides instructions for testing the multi-provider AI support and Supabase integration.

## Prerequisites

Before testing, ensure you have:
1. Node.js 18+ and pnpm installed
2. At least one AI provider configured (Azure OpenAI, Google Gemini, or Groq)
3. (Optional) Supabase project set up for database testing

## Build Validation

### 1. Clean Build Test

```bash
# Clean any previous builds
rm -rf .next node_modules

# Install dependencies
pnpm install

# Build the project
pnpm build
```

**Expected Result:** Build should complete successfully with no errors.

✅ **Status:** PASSED - Build completes successfully

## Provider Configuration Testing

### Test 1: Azure OpenAI Provider

**Setup:**
```bash
# Create .env file with Azure OpenAI credentials
cat > .env << EOF
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_API_VERSION=2024-02-15-preview
EOF
```

**Test Steps:**
1. Start the dev server: `pnpm dev`
2. Navigate to http://localhost:3000/demo
3. Upload a test image
4. Fill in patient history
5. Click "Analyze"
6. Check browser console for: "Using AI provider: Azure OpenAI"

**Expected Result:** 
- Analysis completes successfully
- Results are displayed
- Console shows correct provider name
- Results are saved (check `data/results.json` or Supabase)

### Test 2: Google Gemini Provider

**Setup:**
```bash
# Update .env with Google Gemini credentials
# Comment out Azure OpenAI vars, add:
GOOGLE_GEMINI_API_KEY=your_key_here
GOOGLE_GEMINI_MODEL=gemini-1.5-flash
```

**Test Steps:**
1. Restart the dev server
2. Repeat the demo flow
3. Check console for: "Using AI provider: Google Gemini"

**Expected Result:**
- Analysis completes successfully
- Faster response time compared to Azure OpenAI
- Results are displayed and saved

### Test 3: Groq Provider

**Setup:**
```bash
# Update .env with Groq credentials
# Comment out other providers, add:
GROQ_API_KEY=your_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

**Test Steps:**
1. Restart the dev server
2. Repeat the demo flow
3. Check console for: "Using AI provider: Groq"

**Expected Result:**
- Analysis completes successfully
- Very fast response time
- Results are displayed and saved

### Test 4: Provider Priority

**Setup:**
```bash
# Enable multiple providers in .env
AZURE_OPENAI_API_KEY=azure_key
AZURE_OPENAI_ENDPOINT=https://azure-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini

GOOGLE_GEMINI_API_KEY=gemini_key
GOOGLE_GEMINI_MODEL=gemini-1.5-flash

GROQ_API_KEY=groq_key
GROQ_MODEL=llama-3.3-70b-versatile
```

**Test Steps:**
1. Restart the dev server
2. Run analysis
3. Check which provider is used

**Expected Result:**
- Google Gemini is used (highest priority)
- Console shows: "Using AI provider: Google Gemini"

### Test 5: No Provider Configured

**Setup:**
```bash
# Create empty .env or remove all provider credentials
```

**Test Steps:**
1. Try to run analysis

**Expected Result:**
- API returns 500 error
- Error message: "No AI provider configured. Set environment variables for Azure OpenAI, Google Gemini, or Groq."

## Supabase Integration Testing

### Test 1: Supabase Storage (When Configured)

**Setup:**
```bash
# Add Supabase credentials to .env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Run schema.sql in Supabase SQL Editor
```

**Test Steps:**
1. Run analysis in demo
2. Check Supabase dashboard > Table Editor > analysis_results

**Expected Result:**
- New row appears in analysis_results table
- Contains: id, created_at, provider_name, model_output, parsed_output
- Console shows: "Results saved"

### Test 2: File Storage Fallback (No Supabase)

**Setup:**
```bash
# Remove or comment out Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**Test Steps:**
1. Run analysis in demo
2. Check `data/results.json` file

**Expected Result:**
- File is created/updated at `data/results.json`
- Contains array of analysis results
- Console warning: "Supabase environment variables not configured. Using fallback file storage."

### Test 3: Repository Pattern Abstraction

**Test Steps:**
1. Switch between Supabase and file storage by toggling env vars
2. Restart server each time
3. Verify both work without code changes

**Expected Result:**
- Both storage methods work seamlessly
- No code changes required
- Application detects and uses appropriate storage

## SOLID Principles Verification

### Single Responsibility Principle (SRP)

**Verification:**
- Each provider class handles ONLY its AI operations
- Repository classes handle ONLY data persistence
- Validator handles ONLY configuration validation

✅ **Status:** Each class has one clear responsibility

### Open/Closed Principle (OCP)

**Verification:**
1. Add a new provider without modifying existing code
2. Extend `BaseAIProvider` class
3. Add to factory

✅ **Status:** New providers can be added without modifying existing providers

### Liskov Substitution Principle (LSP)

**Verification:**
1. Switch between providers
2. Application works identically regardless of provider

✅ **Status:** All providers are interchangeable

### Interface Segregation Principle (ISP)

**Verification:**
- Check that interfaces are focused and minimal
- No interface forces unused methods

✅ **Status:** Interfaces are focused (IAIProvider, IAnalysisResultsRepository, IProviderConfigValidator)

### Dependency Inversion Principle (DIP)

**Verification:**
- High-level modules (API routes) depend on abstractions (IAIProvider, IAnalysisResultsRepository)
- Not on concrete implementations

✅ **Status:** Routes depend on interfaces, not concrete classes

## Performance Testing

### Test 1: Response Times

**Test Setup:**
- Use same prompt across all providers
- Measure time from API call to response

**Expected Results:**
- Groq: ~1-2 seconds (fastest)
- Google Gemini: ~2-4 seconds
- Azure OpenAI: ~3-6 seconds

### Test 2: Concurrent Requests

**Test Setup:**
- Make 5 simultaneous demo requests
- Check all complete successfully

**Expected Result:**
- All requests complete
- No errors
- Responses may be slower due to rate limits

## Error Handling Testing

### Test 1: Invalid API Key

**Test Steps:**
1. Set invalid API key
2. Try to run analysis

**Expected Result:**
- API returns 500 error
- Error message indicates authentication failure

### Test 2: Network Error

**Test Steps:**
1. Disconnect internet
2. Try to run analysis

**Expected Result:**
- API returns error
- Error message indicates network failure

### Test 3: Invalid Configuration

**Test Steps:**
1. Set invalid endpoint URL for Azure OpenAI
2. Try to run analysis

**Expected Result:**
- Validation error or connection error
- Clear error message

## Integration Testing Checklist

- [ ] Build completes successfully
- [ ] Azure OpenAI provider works
- [ ] Google Gemini provider works
- [ ] Groq provider works
- [ ] Provider priority works correctly
- [ ] Error handling works for missing config
- [ ] Supabase storage works
- [ ] File storage fallback works
- [ ] Repository pattern abstraction works
- [ ] All SOLID principles verified
- [ ] Error handling works for invalid credentials
- [ ] Error handling works for network issues
- [ ] Documentation is complete and accurate

## Manual Testing Script

Use this script for quick manual testing:

```bash
#!/bin/bash

echo "DermAssist Multi-Provider Testing Script"
echo "========================================"

# Test 1: Build
echo "Test 1: Building project..."
pnpm build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Test 2: Start dev server
echo "Test 2: Starting dev server..."
pnpm dev &
DEV_PID=$!
sleep 10

# Test 3: Check demo page loads
echo "Test 3: Checking demo page..."
curl -s http://localhost:3000/demo > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Demo page loads"
else
    echo "❌ Demo page failed to load"
fi

# Cleanup
kill $DEV_PID

echo "========================================"
echo "Manual testing required:"
echo "1. Test each provider by configuring .env"
echo "2. Run analysis and verify results"
echo "3. Check Supabase integration"
echo "4. Verify error handling"
```

## Troubleshooting Common Issues

### Issue: "Cannot find module '@/lib/providers'"

**Solution:** 
```bash
# Restart TypeScript server in your IDE
# Or restart dev server
pnpm dev
```

### Issue: "Supabase RLS policies block insert"

**Solution:**
```sql
-- In Supabase SQL Editor, run:
CREATE POLICY "Allow all operations" ON analysis_results
  FOR ALL USING (true) WITH CHECK (true);
```

### Issue: "Build fails with TypeScript errors"

**Solution:**
```bash
# Check TypeScript configuration
# Ensure all imports are correct
# Run: pnpm build --debug
```

## Continuous Integration

For CI/CD pipelines, add these checks:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      # Add more tests as needed
```

## Conclusion

This testing guide ensures:
- All providers work correctly
- SOLID principles are maintained
- Storage abstraction works properly
- Error handling is robust
- Documentation is accurate

For issues or questions, refer to [MULTI_PROVIDER_SETUP.md](./MULTI_PROVIDER_SETUP.md) or open a GitHub issue.
