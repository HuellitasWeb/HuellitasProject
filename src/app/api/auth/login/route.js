import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { signSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
        }

        const snapshot = await getDocs(
            query(collection(db, 'admins'), where('email', '==', email))
        );
        const admin = snapshot.docs[0]?.data();

        const isValid =
            admin?.passwordHash && (await bcrypt.compare(password, admin.passwordHash));

        if (!isValid) {
            return NextResponse.json({ error: 'Usuario/Contraseña inválida' }, { status: 401 });
        }

        const user = {
            nombre: admin.nombre,
            email: admin.email,
            role: admin.role === 'root' ? 'root' : 'admin',
        };

        const token = await signSession(user);
        const response = NextResponse.json(user);
        response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
        return response;
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
