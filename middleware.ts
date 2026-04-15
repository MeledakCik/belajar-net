import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const securityToken = request.headers.get("x-belajar-net-core");
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (securityToken !== "kakang-secret-cipher-99") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', 
};