import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getRef, formatData, putElement } from '@/services/services';
import { verifySession } from '@/lib/auth';

export const runtime = 'nodejs';

const MIN_LENGTH = 6;

// Cambio de la propia contraseña para CUALQUIER admin logueado (root o admin).
// Distinto del PUT /api/admins (solo-root, para administrar a otros): aquí se
// verifica la contraseña actual del usuario de la sesión.
export async function POST(req) {
    const session = await verifySession(req);
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }
        if (newPassword.length < MIN_LENGTH) {
            return NextResponse.json(
                { error: `La nueva contraseña debe tener al menos ${MIN_LENGTH} caracteres` },
                { status: 400 }
            );
        }

        const admins = formatData(await getRef('admins'));
        const match = admins.find((a) => a.data.email === session.email);

        if (!match || !match.data.passwordHash) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const ok = await bcrypt.compare(currentPassword, match.data.passwordHash);
        if (!ok) {
            return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 400 });
        }

        await putElement(
            { passwordHash: bcrypt.hashSync(newPassword, 10) },
            match.id,
            'admins'
        );

        return NextResponse.json({ message: 'Contraseña actualizada' }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
