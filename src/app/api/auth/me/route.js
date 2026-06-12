import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function GET(req) {
    const session = await verifySession(req);

    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { nombre, email, role } = session;
    return NextResponse.json({ nombre, email, role });
}
