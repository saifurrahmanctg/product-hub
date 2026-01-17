import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const isProtectedArea = pathname.startsWith('/dashboard') || pathname.startsWith('/cart');
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

    const hasToken = request.cookies.has('authToken');

    if (isProtectedArea && !hasToken) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    if (isAuthPage && hasToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
        '/cart',
        '/cart/:path*',
        '/login',
        '/register'
    ],
};
