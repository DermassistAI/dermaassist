import fs from 'fs'
import path from 'path'

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split(/\r?\n/)
  const out = {}
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx)
    const val = trimmed.slice(idx + 1)
    out[key] = val
  }
  return out
}

async function main() {
  const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..')
  const envPath = path.join(repoRoot, '.env.local')
  const env = parseEnvFile(envPath)

  const KEY = process.env.AZURE_OPENAI_API_KEY || env.AZURE_OPENAI_API_KEY
  let ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || env.AZURE_OPENAI_ENDPOINT
  const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || env.AZURE_OPENAI_API_VERSION
  const DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || env.AZURE_OPENAI_DEPLOYMENT

  if (!KEY || !ENDPOINT) {
    console.error('Missing AZURE_OPENAI_API_KEY or AZURE_OPENAI_ENDPOINT in environment or .env.local')
    process.exit(2)
  }

  if (API_VERSION && !ENDPOINT.includes('api-version')) {
    ENDPOINT += (ENDPOINT.includes('?') ? '&' : '?') + 'api-version=' + encodeURIComponent(API_VERSION)
  }

  console.log('Endpoint:', ENDPOINT)
  console.log('Using deployment:', DEPLOYMENT || '(none)')

  const body = {
    input: 'Hello from local test script: ping',
  }
  if (DEPLOYMENT) body.deployment = DEPLOYMENT

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': KEY,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    console.log('Status:', res.status, res.statusText)
    const text = await res.text()
    try {
      const json = JSON.parse(text)
      console.log('Response JSON:')
      console.dir(json, { depth: 4 })
    } catch (e) {
      console.log('Response text:')
      console.log(text)
    }
  } catch (e) {
    console.error('Request failed:', e && e.message ? e.message : e)
    process.exit(3)
  }
}

main()
