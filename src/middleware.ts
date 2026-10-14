import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  const region = country === 'IN' ? 'IN' : 'US';

  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value;

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentRoute = pathname.startsWith('/student');

  let response = NextResponse.next();

  if (!token) {
    if (isAdminRoute || isStudentRoute) {
      response = NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (isAuthPage) {
      if (userRole === 'admin') {
        response = NextResponse.redirect(new URL('/admin/courses', request.url));
      } else {
        response = NextResponse.redirect(new URL('/student', request.url));
      }
    } else if (isAdminRoute && userRole !== 'admin') {
      response = NextResponse.redirect(new URL('/student', request.url));
    } else if (isStudentRoute && userRole === 'admin') {
      response = NextResponse.redirect(new URL('/admin/courses', request.url));
    }
  }

  response.cookies.set('userRegion', region, {
    path: '/',
    maxAge: 2592000,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};