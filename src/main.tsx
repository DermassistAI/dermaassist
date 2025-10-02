import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Runtime environment congruence check
// - Warn if a client-side Groq key is present (VITE_GROQ_APIKEY) since that exposes the key to the browser
// - Warn if neither client (VITE_GROQ_APIKEY) nor server (GROQ_APIKEY) keys are present
try {
	const viteEnv = (typeof import.meta !== 'undefined') ? (import.meta.env as unknown as Record<string, string | undefined>) : {};
		const clientKey = viteEnv.VITE_GROQ_APIKEY;
		const serverKeyPresent = typeof process !== 'undefined' && (process as unknown as { env?: Record<string, string | undefined> }).env?.GROQ_APIKEY ? true : false;

		if (clientKey) {
			console.warn('Warning: VITE_GROQ_APIKEY is set — this exposes the Groq API key to the browser. Use only for local demos.');
		}

		if (!clientKey && !serverKeyPresent) {
			console.warn('Warning: No GROQ API key found. Set VITE_GROQ_APIKEY (for local demo) or GROQ_APIKEY (server-side) to enable LLM calls.');
		}
} catch (e) {
	// ignore in constrained runtimes
}

createRoot(document.getElementById("root")!).render(<App />);
