import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    db_url_set: !!process.env.DATABASE_URL,
    admin_email_set: !!process.env.ADMIN_EMAIL,
    admin_password_set: !!process.env.ADMIN_PASSWORD,
    auth_secret_set: !!process.env.AUTH_SECRET,
    pwd_val: process.env.ADMIN_PASSWORD,
    email_val: process.env.ADMIN_EMAIL
  });
}
