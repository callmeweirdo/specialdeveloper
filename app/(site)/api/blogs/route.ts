import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: 'blogs', limit: 100 });
    return NextResponse.json(result.docs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
