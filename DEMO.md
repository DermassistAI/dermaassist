Running the demo (single-process)

This repository includes a small Node server under `server/` that serves the built frontend and exposes a simple API to store de-identified analysis results as JSON (demo-only).

1. Install deps: `pnpm install`
2. Build and start the demo server: `pnpm start`

The server will build the Vite app, place static files in `/dist`, then start an Express server that serves the SPA and an API endpoint at `/api/results` which accepts POST requests with the model output.

Note: this is for demo only. For production or Vercel deployment, convert the API to serverless functions and use a managed DB.

Environment: choose one of the following for local runs.

For a browser/demo convenience where the frontend calls Groq directly set (in `.env.local`):

VITE_GROQ_APIKEY=your_groq_key_here

Warning: storing API keys in client-side env is insecure. Use only for local demos.

For a safer setup where only the server has the key (recommended for anything beyond local demos), set in your server environment:

GROQ_APIKEY=your_server_groq_key_here
