import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const guide = dbService.getGuide(params.id);
    
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(guide);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch guide' },
      { status: 500 }
    );
  }
}
