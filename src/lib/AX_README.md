This project includes a small helper for initializing ax-llm providers.

Environment variables

- GROQ_APIKEY - API key for Groq provider (if used)
- QWEN_APIKEY - API key for Qwen provider (if used)
- PREFERRED_LLM - optional: "groq" or "qwen" to pick default client

Example usage

```ts
import ax from "@/lib/axClient";

const client = ax.createDefaultClient();
// Use the client according to ax-llm provider API (chat.create, complete, etc.)
```

Notes

- The ax-llm typings may not include every provider name or model string; this helper casts to `unknown` to keep the wrapper simple. Adapt types in your app for stricter guarantees.
- For qwen/qwen3-32b, set QWEN_APIKEY and PREFERRED_LLM=qwen in your local env when running the app.
