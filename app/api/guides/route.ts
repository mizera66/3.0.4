import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || undefined;

  try {
    const guides = dbService.getGuides(category);
    return NextResponse.json({
      guides,
      total: guides.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}
