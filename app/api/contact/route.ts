import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;
    
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
    const contacts = await sql`SELECT * FROM contacts ORDER BY created_at DESC`;
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
