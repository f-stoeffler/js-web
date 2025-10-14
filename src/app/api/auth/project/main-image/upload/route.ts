import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const slug = formData.get('slug') as string;

    if (!file || !slug) {
      return NextResponse.json(
        { error: 'File and slug are required' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsBaseDir = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');
    const projectDir = path.join(uploadsBaseDir, slug);
    
    if (!existsSync(projectDir)) {
      await mkdir(projectDir, { recursive: true });
    }

    const fileExtension = path.extname(file.name);
    const fileName =  `main${fileExtension}`;
    const filePath = path.join(projectDir, fileName);

    await writeFile(filePath, buffer);

    const dbPath = `${slug}/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      filePath: dbPath,
      fileName 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}