import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sanitizedName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const uniqueFileName = `${Date.now()}-${sanitizedName}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);
    const fileUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json({ 
      url: fileUrl, 
      pathname: fileUrl,
      contentType: request.headers.get('content-type') || 'application/octet-stream'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}