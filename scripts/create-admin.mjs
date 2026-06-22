// Crea / actualiza (o elimina) una cuenta admin en Firestore. NO se despliega.
// Corre en local contra la Firebase compartida con producción.
//
// Uso:
//   node --env-file=.env scripts/create-admin.mjs <email> [contraseña]
//     Crea o actualiza el admin con ese email como root (estado activo).
//     Si omites la contraseña, se genera una aleatoria y se imprime en consola.
//
//   node --env-file=.env scripts/create-admin.mjs --remove <email>
//     Elimina el documento admin con ese email (p.ej. la cuenta de prueba).

import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';

// Generador de contraseñas seguro. Se duplica aquí (en vez de importar
// src/lib/password.js) porque Node trata los .js como CommonJS y no podría
// importar ese módulo ESM sin "type":"module" en package.json.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
function generatePassword(len = 12) {
    let out = '';
    for (let i = 0; i < len; i++) out += ALPHABET[randomInt(ALPHABET.length)];
    return out;
}

const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const args = process.argv.slice(2);

async function findByEmail(email) {
    const snapshot = await getDocs(collection(db, 'admins'));
    return snapshot.docs.find((d) => d.data().email === email) ?? null;
}

// --- Modo eliminar -----------------------------------------------------------
if (args[0] === '--remove') {
    const email = args[1];
    if (!email) {
        console.error('Falta el email. Uso: --remove <email>');
        process.exit(1);
    }

    const existing = await findByEmail(email);
    if (!existing) {
        console.log(`No existe admin con email ${email}. Nada que eliminar.`);
    } else {
        await deleteDoc(doc(db, 'admins', existing.id));
        console.log(`Eliminado admin: ${email}`);
    }
    process.exit(0);
}

// --- Modo crear / actualizar -------------------------------------------------
const email = args[0];
let password = args[1];

if (!email) {
    console.error(
        'Falta el email. Uso: node --env-file=.env scripts/create-admin.mjs <email> [contraseña]'
    );
    process.exit(1);
}

if (!password) {
    password = generatePassword();
    console.log(`Contraseña generada: ${password}`);
}

const passwordHash = bcrypt.hashSync(password, 10);
const existing = await findByEmail(email);

if (existing) {
    await updateDoc(doc(db, 'admins', existing.id), {
        passwordHash,
        role: 'root',
        estado: true,
    });
    console.log(`Admin actualizado (root): ${email}`);
} else {
    await addDoc(collection(db, 'admins'), {
        nombre: 'Huellitas',
        email,
        passwordHash,
        role: 'root',
        estado: true,
    });
    console.log(`Admin creado (root): ${email}`);
}

console.log('Listo.');
process.exit(0);
