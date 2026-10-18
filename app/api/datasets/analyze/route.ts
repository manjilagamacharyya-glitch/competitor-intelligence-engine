import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { NextResponse, type NextRequest } from 'next/server'

const MAX_PREVIEW_LENGTH = 48_000

type Analysis = {
  summary: string
  keyFindings: string[]
  competitorSignals: string[]
  risks: string[]
  recommendedActions: string[]
}

function parseAnalysis(text: string): Analysis {
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
  const parsed = JSON.parse(cleaned) as Partial<Analysis>
  const list = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string').slice(0, 6) : []
  return {
    summary: typeof parsed.summary === 'string' ? parsed.summary : 'The dataset was analyzed, but no summary was returned.',
    keyFindings: list(parsed.keyFindings),
    competitorSignals: list(parsed.competitorSignals),
    risks: list(parsed.risks),
    recommendedActions: list(parsed.recommendedActions),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { filename?: string; preview?: string; pathname?: string }
    if (!body.preview || body.preview.length > MAX_PREVIEW_LENGTH) {
      return NextResponse.json({ error: 'Send a dataset preview smaller than 48 KB.' }, { status: 413 })
    }

    const { text } = await generateText({
      model: google('gemini-3.6-flash'),
      system: 'You are CompetIQ, a competitor intelligence analyst. Return only complete, valid JSON. Use at most 3 short items in each array. Be evidence-led and never invent facts not supported by the dataset.',
      prompt: `Analyze this dataset (${body.filename ?? 'dataset'}). Return exactly this JSON shape with a concise summary and no markdown: {"summary":"string","keyFindings":["string"],"competitorSignals":["string"],"risks":["string"],"recommendedActions":["string"]}. Dataset preview:\n${body.preview}`,
      maxOutputTokens: 1600,
    })

    return NextResponse.json({ analysis: parseAnalysis(text), pathname: body.pathname ?? null })
  } catch (error) {
    console.error('[v0] Dataset analysis failed', error)
    return NextResponse.json({ error: 'AI analysis is unavailable right now. Check the gateway connection and retry.' }, { status: 502 })
  }
}
