import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const filters = {
    type: searchParams.get('type') || undefined,
    area: searchParams.get('area') || undefined,
    tags: searchParams.get('tags')?.split(',') || undefined,
    search: searchParams.get('q') || undefined,
    status: searchParams.get('status') || undefined,
  };

  const popular = searchParams.get('popular') === 'true';
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    let entities;
    
    if (popular) {
      entities = dbService.getPopular(limit);
    } else {
      entities = dbService.getEntities(filters).slice(0, limit);
    }

    return NextResponse.json({
      entities,
      total: entities.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch entities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entity = dbService.createEntity(body);
    return NextResponse.json(entity, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create entity' },
      { status: 500 }
    );
  }
}
