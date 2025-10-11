import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const slug = formData.get('slug') as string;
    const isMainImage = formData.get('isMainImage') === 'true';

    if (!file || !slug) {
      return NextResponse.json(
        { error: 'File and slug are required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use a directory OUTSIDE of the Next.js build
    // For development on Windows, you might want to use a different path
    const uploadsBaseDir = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');
    const projectDir = path.join(uploadsBaseDir, slug);
    
    // Create directory if it doesn't exist
    if (!existsSync(projectDir)) {
      await mkdir(projectDir, { recursive: true });
    }

    // Generate filename - keep original extension
    const fileExtension = path.extname(file.name);
    const fileName = isMainImage ? `main${fileExtension}` : `${Date.now()}${fileExtension}`;
    const filePath = path.join(projectDir, fileName);

    // Write file
    await writeFile(filePath, buffer);

    // Return the path that will be used to serve the file
    // This will be relative to your uploads serving route
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