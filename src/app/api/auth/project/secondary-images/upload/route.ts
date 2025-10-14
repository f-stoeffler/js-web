import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // const images = formData.get('images') as File;
    const formImageIDs = formData.get('imageIDs') as string;
    const formDbUpdate = formData.get('dbUpdate') as Prisma.ProjectUpdateInput;

    const imageIDs: Array<number> = JSON.parse(formImageIDs)

    imageIDs.forEach(function (val) {
      
    })

    console.log(imageIDs[0])
    return NextResponse.json({ 
      success: true,
    });


  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}