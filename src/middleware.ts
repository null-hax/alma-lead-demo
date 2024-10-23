import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (request.nextUrl.pathname.startsWith('/api/leads') && request.method !== 'POST') {
    if (authHeader !== 'Bearer mock-token') {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }
}

export const config = {
  matcher: '/api/leads/:path*',
};
