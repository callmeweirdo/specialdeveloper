import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET() {
  try {
    const analytics = await sql`SELECT * FROM analytics ORDER BY id LIMIT 1`;
    return NextResponse.json(analytics[0] || { views: 0, leads: 0, engagementRate: '0%', topService: '' });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
