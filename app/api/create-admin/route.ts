export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createAdminUser } from '@/lib/auth';

export async function POST() {
  try {
    await createAdminUser();
    return NextResponse.json({ message: 'Admin user creation attempted' });
  } catch (error) {
    console.error('Error in create-admin API:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}