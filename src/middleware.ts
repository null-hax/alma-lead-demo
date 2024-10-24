import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: '/api/leads/:path*',
};
