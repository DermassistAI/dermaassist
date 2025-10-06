import { NextResponse } from 'next/server'
import axClient from '@/lib/axClient'
import { callModelText } from '@/lib/axHelpers'
import { buildPrompt } from '@/lib/axSignatures'

export async function POST(req: Request) {
  try {
  const body = await req.json()
  const input = body?.input
  if (!input) return NextResponse.json({ error: 'Missing input' }, { status: 400 })

  // Build sanitized prompt server-side to avoid sending large base64 images
  const prompt = buildPrompt(input)

  // Create server-side client using environment vars (kept secret)
  const client = axClient.createDefaultClient()

    const text = await callModelText(client, String(prompt))

    // Try to parse the model response as JSON matching ModelOutput
    let parsed: any = null
    try {
      parsed = JSON.parse(String(text))
    } catch (e) {
      // not JSON — we'll synthesize a friendly ModelOutput fallback
      const shortSummary = String(text).slice(0, 1600)
      parsed = {
        summary: shortSummary,
        primaryDiagnosis: {
          condition: 'Unable to determine from provided data',
          confidence: 0,
          severity: '',
          description: shortSummary,
        },
        differentials: [],
        culturalConsiderations: [],
        recommendations: [
          'Provide higher-resolution images and detailed clinical history (age, skin type, duration, symptoms).',
          'If urgent features are present (rapid growth, bleeding, systemic symptoms) advise in-person evaluation.'
        ],
      }
    }

    return NextResponse.json({ text, parsed })
  } catch (err: any) {
    console.error('API /api/ai error:', err)
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}
