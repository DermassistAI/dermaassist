import { NextResponse } from 'next/server'
import { getAnalysisResultsRepository, type AnalysisResult } from '@/lib/supabase'

/**
 * API Route for saving analysis results
 * Uses Repository Pattern following Dependency Inversion Principle (DIP)
 * Works with both Supabase (when configured) and file storage (fallback)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Get the appropriate repository implementation (Supabase or File)
    const repository = getAnalysisResultsRepository()
    
    // Create analysis result object
    const result: AnalysisResult = {
      provider_name: body.providerName || 'unknown',
      model_output: body.modelOutput || '',
      parsed_output: body.parsed || null,
      image_url: body.imageUrl || null,
      metadata: body.metadata || {},
    }

    // Save using repository
    const saveResult = await repository.save(result)
    
    if (saveResult.success) {
      return NextResponse.json({ ok: true })
    } else {
      return NextResponse.json(
        { error: saveResult.error || 'Failed to save results' },
        { status: 500 }
      )
    }
  } catch (err: any) {
    console.error('/api/results error', err)
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}

/**
 * GET endpoint to retrieve results
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const limit = parseInt(searchParams.get('limit') || '100', 10)
    
    const repository = getAnalysisResultsRepository()
    
    if (id) {
      const result = await repository.getById(id)
      if (result) {
        return NextResponse.json(result)
      } else {
        return NextResponse.json({ error: 'Result not found' }, { status: 404 })
      }
    } else {
      const results = await repository.getAll(limit)
      return NextResponse.json({ results })
    }
  } catch (err: any) {
    console.error('/api/results GET error', err)
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}
