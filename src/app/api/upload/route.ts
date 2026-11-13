import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename || !request.body) {
      return NextResponse.json({ error: 'Filename and file body are required' }, { status: 400 });
    }

    const sanitizedName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const uniqueFileName = `${Date.now()}-${sanitizedName}`;
    const contentType = request.headers.get('content-type') || 'application/octet-stream';

    const blob = await put(uniqueFileName, request.body, {
      access: 'public',
      contentType: contentType,
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}