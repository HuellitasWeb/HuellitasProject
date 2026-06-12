import { NextResponse } from 'next/server';
import { uploadImage } from '@/services/crabStorage';
import { verifySession } from '@/lib/auth';

export async function POST(req) {
    const session = await verifySession(req);
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
            return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });
        }

        const url = await uploadImage(file);
        if (!url) {
            return NextResponse.json({ error: 'No se pudo subir la imagen' }, { status: 502 });
        }

        return NextResponse.json({ url });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
