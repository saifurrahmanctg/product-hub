import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const isProtectedArea = pathname.startsWith('/dashboard') || pathname === '/cart';
    const isAuthPage = pathname === '/login' || pathname === '/register';

    const token = request.cookies.get('authToken')?.value;

    if (isProtectedArea && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/cart', '/login', '/register'],
};
