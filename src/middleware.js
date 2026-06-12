import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(request) {
    const session = await verifySession(request);

    if (!session) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
