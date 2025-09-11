import { NextRequest, NextResponse } from 'next/server';
import { getProjectsPaginated } from '@/repo/projects';

export async function GET(page: number) {
  try {
    const projects = await getProjectsPaginated(page, 8);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}