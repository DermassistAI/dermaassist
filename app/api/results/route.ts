import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const repoRoot = path.resolve(process.cwd())
    const dataDir = path.join(repoRoot, 'data')
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

    const outPath = path.join(dataDir, 'results.json')
    let arr: any[] = []
    if (fs.existsSync(outPath)) {
      try { arr = JSON.parse(fs.readFileSync(outPath, 'utf8')) } catch (e) { arr = [] }
    }

    arr.push({ id: Date.now(), createdAt: new Date().toISOString(), payload: body })
    fs.writeFileSync(outPath, JSON.stringify(arr, null, 2), 'utf8')

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('/api/results error', err)
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}
