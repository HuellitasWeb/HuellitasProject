import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getRef, formatData, putElement } from '@/services/services';
import { sendMail } from '@/services/mailer';
import { passwordResetEmail } from '@/services/emailTemplates';
import { generatePassword } from '@/lib/password';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

// Mensaje genérico: nunca revelamos si el email existe (anti-enumeración).
const GENERIC = 'Si el correo está registrado, te enviaremos una nueva contraseña.';

export async function POST(req) {
    const ip = getClientIp(req);
    if (rateLimit(`restore:${ip}`, { limit: 3, windowMs: 60 * 60 * 1000 })) {
        return NextResponse.json(
            { message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
            { status: 429 }
        );
    }

    try {
        const { email } = await req.json();

        if (email) {
            const admins = formatData(await getRef('admins'));
            const match = admins.find((a) => a.data.email === email);

            // Funciona igual para root y admin; si no existe, no hacemos nada.
            if (match) {
                const password = generatePassword();
                await putElement(
                    { passwordHash: bcrypt.hashSync(password, 10) },
                    match.id,
                    'admins'
                );
                await sendMail({
                    to: match.data.email,
                    ...passwordResetEmail({ nombre: match.data.nombre, password }),
                });
            }
        }
    } catch (e) {
        // Se loguea pero se responde genérico igual: no filtrar estado interno.
        console.error(e);
    }

    return NextResponse.json({ message: GENERIC }, { status: 200 });
}
