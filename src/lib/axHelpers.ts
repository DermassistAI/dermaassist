/**
 * Lightweight, typed helpers to call ax-llm clients in a consistent way.
 *
 * The helper exposes `callModelText` which returns a plain string response
 * for the most common ax client shapes (chat.create, complete, call).
 *
 * This file avoids `any` by using `unknown` and narrow function types.
 */
export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

type Fn = (...args: unknown[]) => Promise<unknown>;

function extractText(res: unknown): string | null {
  // Direct string responses
  if (typeof res === 'string') return res;

  // Recursively search common keys and nested structures for the first string value.
  const visited = new WeakSet<object>();

  function findString(obj: unknown, depth = 0): string | null {
    if (depth > 6) return null;
    if (obj == null) return null;
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);

    if (Array.isArray(obj)) {
      for (const el of obj) {
        const s = findString(el, depth + 1);
        if (s) return s;
      }
      return null;
    }

    if (typeof obj === 'object') {
      try {
        const o = obj as Record<string, unknown>;
        if (visited.has(o)) return null;
        visited.add(o as object);

        // common direct keys
        const directKeys = ['output_text', 'text', 'content', 'answer', 'reply', 'body'];
        for (const k of directKeys) {
          if (typeof o[k] === 'string') return String(o[k]);
        }

        // choices/message pattern
        const choices = o['choices'] as unknown;
        if (Array.isArray(choices) && choices.length) {
          const c0 = choices[0] as Record<string, unknown> | null;
          if (c0) {
            const message = c0['message'] as Record<string, unknown> | null;
            if (message) {
              const s = findString(message, depth + 1);
              if (s) return s;
            }
            if (typeof c0['text'] === 'string') return String(c0['text']);
          }
        }

        // output array or object
        const out = o['output'] as unknown;
        if (Array.isArray(out) && out.length) {
          for (const item of out) {
            const s = findString(item, depth + 1);
            if (s) return s;
          }
        }

        // data wrapper
        const data = o['data'] as unknown;
        if (data) {
          const s = findString(data, depth + 1);
          if (s) return s;
        }

        // fall back to scanning all keys
        for (const k of Object.keys(o)) {
          const s = findString(o[k], depth + 1);
          if (s) return s;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  return findString(res);
}

/**
 * Call a model client and return a plain string response.
 * Supports clients exposing `chat.create`, `complete`, or a callable `call`.
 *
 * Example usage:
 * const client = createDefaultClient();
 * const text = await callModelText(client, 'Summarize this...');
 */
export async function callModelText(client: unknown, prompt: string): Promise<string> {
  if (!client) throw new Error("No client provided");

  const c = client as Record<string, unknown>;
  let lastRes: unknown = null;

  // Build a list of candidate targets to probe for call/create methods.
  const candidates: Array<Record<string, unknown> | null> = [c];
  try {
    const aiObj = (c && typeof c === 'object' && (c as Record<string, unknown>)['ai']) as Record<string, unknown> | undefined;
    if (aiObj && typeof aiObj === 'object') candidates.push(aiObj);
  } catch (e) {
    void e;
  }
  try {
    const clientObj = (c && typeof c === 'object' && (c as Record<string, unknown>)['client']) as Record<string, unknown> | undefined;
    if (clientObj && typeof clientObj === 'object') candidates.push(clientObj);
  } catch (e) {
    void e;
  }
  try {
    const def = (c && typeof c === 'object' && (c as Record<string, unknown>)['default']) as Record<string, unknown> | undefined;
    if (def && typeof def === 'object') candidates.push(def);
  } catch (e) { void e; }

  // Probe candidates for common method shapes.
  const methodNames = [
    // chat/completion shapes
    ['chat', 'create'],
    ['create'],
    ['complete'],
    ['call'],
    // newer or alternate names
    ['run'],
    ['generate'],
    ['predict'],
    ['invoke'],
    ['createCompletion'],
    ['response']
  ];

  for (const target of candidates) {
    if (!target) continue;
    // if the target itself is callable (some clients are functions or proxies), try calling it directly
    try {
      if (typeof (target as unknown) === 'function') {
        try {
          const res = await (target as unknown as Fn)(prompt as unknown);
          lastRes = res;
          const t = extractText(res);
          if (t !== null) return t;
        } catch (e) {
          try {
            const res = await (target as unknown as Fn)({ input: prompt } as unknown);
            lastRes = res;
            const t = extractText(res);
            if (t !== null) return t;
          } catch (e2) {
            void e2;
          }
        }
      }
    } catch (e) {
      void e;
    }
    for (const m of methodNames) {
      try {
        // support nested paths like ['chat','create'] or single ['run']
        let fn: Fn | undefined;
        if (m.length === 2) {
          const obj = target[m[0] as keyof typeof target] as unknown;
          if (obj && typeof obj === 'object') fn = (obj as Record<string, unknown>)[m[1]] as unknown as Fn | undefined;
        } else {
          fn = target[m[0] as keyof typeof target] as unknown as Fn | undefined;
        }

        if (fn && typeof fn === 'function') {
          // try various calling conventions depending on method
          let res: unknown = null;
          if (m[0] === 'chat' || (m[0] === 'create' && m.length === 2)) {
            res = await (fn as Fn)({ messages: [{ role: 'user', content: prompt }] } as unknown);
          } else if (m[0] === 'complete' || m[0] === 'create' || m[0] === 'generate' || m[0] === 'createCompletion') {
            res = await (fn as Fn)({ prompt } as unknown);
          } else if (m[0] === 'call' || m[0] === 'run' || m[0] === 'invoke' || m[0] === 'predict' || m[0] === 'response') {
            // try function(prompt) and function({ input: prompt }) and function({ prompt })
            try {
              res = await (fn as Fn)(prompt as unknown);
            } catch (e) {
              try {
                res = await (fn as Fn)({ input: prompt } as unknown);
              } catch (e2) {
                res = await (fn as Fn)({ prompt } as unknown);
              }
            }
          } else {
            // fallback: try passing prompt directly
            res = await (fn as Fn)(prompt as unknown);
          }

          lastRes = res;
          const t = extractText(res);
          if (t !== null) {
            console.debug('callModelText: successfully extracted text using method', m, 'on target', Object.keys(target));
            return t;
          }
        }
      } catch (e) {
        // ignore and try next method
      }
    }
  }

  // Provide the raw client object for debugging in development environments
  try {
    // prefer console.error so it's visible even when debug-level is suppressed
    console.error('callModelText: failed to extract text from response. Last response:', lastRes, 'Full client:', client);
    try {
      if (typeof window !== 'undefined' && window.localStorage && lastRes !== null) {
        window.localStorage.setItem('lastModelResponse', JSON.stringify(lastRes));
      }
    } catch (e) {
      // ignore localStorage errors
    }
    // Also persist a lightweight summary of the client object so we can see what methods are available.
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const clientObj = client as Record<string, unknown> | null;
        const summary: Record<string, unknown> = { keys: [] };
        if (clientObj && typeof clientObj === 'object') {
          const obj = clientObj as Record<string, unknown>;
          const keys = Object.keys(obj);
          const ownNames = Object.getOwnPropertyNames(obj || {});
          const symbols = Object.getOwnPropertySymbols(obj || {}).map(s => String(s));
          const proto = Object.getPrototypeOf(obj) || null;
          const protoNames = proto ? Object.getOwnPropertyNames(proto).filter(n => n !== 'constructor') : [];

          summary.keys = keys.map(k => ({ key: k, type: typeof obj[k], isFunction: typeof obj[k] === 'function' }));
          summary.ownPropertyNames = ownNames;
          summary.symbols = symbols;
          summary.prototypeMethods = protoNames;
          summary.length = keys.length;
        } else {
          summary.keys = String(clientObj);
        }
        window.localStorage.setItem('lastModelClientSummary', JSON.stringify(summary));
        console.error('callModelText: saved client summary to localStorage.lastModelClientSummary', summary);
      }
    } catch (e) {
      // ignore storage errors
    }
  } catch (e) {
    // ignore
  }
  throw new Error("Unable to extract text from model response; see console.error and localStorage['lastModelResponse'] and localStorage['lastModelClientSummary'] for diagnostics.");
}

export default { callModelText };
