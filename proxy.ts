// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// GANTI: Nama fungsi harus 'proxy' atau gunakan 'export default'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Logika pengecekan cookie Cikawan Guard
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('cikawan_auth')?.value;
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    if (!authCookie || authCookie !== adminSecret) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Config tetap sama untuk menentukan route mana yang di-proxy
export const config = {
  matcher: '/admin/:path*',
};