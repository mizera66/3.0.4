import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entity = dbService.getEntity(params.id);
    
    if (!entity) {
      return NextResponse.json(
        { error: 'Entity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(entity);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch entity' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const entity = dbService.updateEntity(params.id, body);
    
    if (!entity) {
      return NextResponse.json(
        { error: 'Entity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(entity);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update entity' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = dbService.deleteEntity(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Entity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete entity' },
      { status: 500 }
    );
  }
}
