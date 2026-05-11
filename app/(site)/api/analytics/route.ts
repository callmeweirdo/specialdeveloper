import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: 'analytics', limit: 1 });
    const doc = result.docs[0];
    return NextResponse.json(doc ? {
      views: doc.views,
      leads: doc.leads,
      engagementRate: doc.engagementRate,
      topService: doc.topService,
    } : { views: 0, leads: 0, engagementRate: '0%', topService: '' });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
