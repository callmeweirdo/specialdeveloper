import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(request: Request) {
  try {
    const { name, email, date, service, brief } = await request.json();
    const payload = await getPayload({ config });
    await payload.create({
      collection: 'bookings',
      data: { name, email, date, service, brief },
    });
    return NextResponse.json({
      success: true,
      message: 'Reservation logged. David will confirm your session shortly.'
    });
  } catch (error) {
    console.error('Failed to save booking:', error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: 'bookings', limit: 100, sort: '-createdAt' });
    return NextResponse.json(result.docs);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
