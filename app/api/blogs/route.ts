import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET() {
  try {
    const blogs = await sql`SELECT * FROM blogs ORDER BY id`;
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
