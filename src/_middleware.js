import { NextResponse } from 'next/server';
import cache from "@/app/services/cache";

export function _middleware(request) {
    const { pathname } = request.nextUrl;
    const token = cache.get('token');

    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token) {
        return NextResponse.redirect(new URL(pathname, request.url));
    }

    return NextResponse.next();
}

export const config = {
    //matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    matcher: ['unknown'],
};
