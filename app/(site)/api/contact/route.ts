import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const payload = await getPayload({ config });
    await payload.create({
      collection: 'contacts',
      data: { name, email, message },
    });
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! We've received your inquiry and will get back to you within 24 hours."
    });
  } catch (error) {
    console.error('Failed to save contact:', error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: 'contacts', limit: 100, sort: '-createdAt' });
    return NextResponse.json(result.docs);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
