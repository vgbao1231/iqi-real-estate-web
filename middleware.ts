import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get('token')?.value); // ví dụ đọc từ cookie

  const { pathname } = request.nextUrl;

  // Cho phép truy cập trang login
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Nếu là trang admin/* mà chưa login thì redirect
  // if (pathname.startsWith('/admin') && !isLoggedIn) {
  //   const loginUrl = new URL('/admin/login', request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho route admin/*
export const config = {
  matcher: ['/admin/:path*'],
};
