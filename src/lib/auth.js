// Sesión de admin firmada con JWT (jose) en cookie HttpOnly.
// Sin `import 'server-only'` porque el middleware (Edge) también lo importa;
// ningún client component debe importar este módulo.
import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'session';

const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSecretKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET no está definido en el entorno');
    }
    return new TextEncoder().encode(secret);
}

export async function signSession(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
        .sign(getSecretKey());
}

// Lee y valida la cookie de sesión de un NextRequest. Devuelve el payload o null.
export async function verifySession(request) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, getSecretKey());
        return payload;
    } catch {
        return null;
    }
}

export function sessionCookieOptions(maxAge = SESSION_DURATION_SECONDS) {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge,
    };
}
