import { NextResponse, type NextRequest } from 'next/server'

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = new Set([
  'text/csv',
  'application/json',
  'text/plain',
  'application/vnd.ms-excel',
])
const ALLOWED_EXTENSIONS = new Set(['csv', 'json', 'txt'])

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const entry = formData.get('file')
    if (!(entry instanceof File)) {
      return NextResponse.json({ error: 'Choose a dataset file to upload.' }, { status: 400 })
    }

    const extension = entry.name.split('.').pop()?.toLowerCase() ?? ''
    if (!ALLOWED_EXTENSIONS.has(extension) && !ALLOWED_TYPES.has(entry.type)) {
      return NextResponse.json({ error: 'Upload a CSV, JSON, or TXT dataset.' }, { status: 415 })
    }
    if (entry.size === 0 || entry.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Datasets must be between 1 byte and 8 MB.' }, { status: 413 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({
        pathname: `local-datasets/${Date.now()}-${entry.name}`,
        filename: entry.name,
        size: entry.size,
        type: entry.type || 'text/plain',
        storage: 'local',
      })
    }

    const { put } = await import('@vercel/blob')
    const blob = await put(`datasets/${Date.now()}-${entry.name}`, entry, {
      access: 'private',
      addRandomSuffix: true,
    })

    return NextResponse.json({
      pathname: blob.pathname,
      filename: entry.name,
      size: entry.size,
      type: entry.type || 'text/plain',
    })
  } catch (error) {
    console.error('[v0] Dataset upload failed', error)
    return NextResponse.json({ error: 'The dataset could not be uploaded. Try again.' }, { status: 500 })
  }
}
