// Migración one-shot de contraseñas de la colección `admins` (NO se despliega).
//
// Uso:
//   node --env-file=.env scripts/hash-admin-passwords.mjs            → añade `passwordHash` (bcrypt 10)
//     a los docs que solo tienen `contraseña`, asegura `role` y migra el root del .env a Firestore.
//     Conserva `contraseña` para que la versión desplegada vieja siga funcionando.
//   node --env-file=.env scripts/hash-admin-passwords.mjs --cleanup  → elimina el campo `contraseña`
//     en texto plano de los docs que ya tienen `passwordHash`. Ejecutar SOLO tras desplegar la versión nueva.

import bcrypt from 'bcryptjs';
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteField,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';

const cleanup = process.argv.includes('--cleanup');

const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const snapshot = await getDocs(collection(db, 'admins'));

for (const adminDoc of snapshot.docs) {
    const data = adminDoc.data();
    const ref = doc(db, 'admins', adminDoc.id);
    const updates = {};

    if (cleanup) {
        if (data.passwordHash && data['contraseña'] !== undefined) {
            updates['contraseña'] = deleteField();
        }
    } else {
        if (!data.passwordHash && data['contraseña']) {
            updates.passwordHash = bcrypt.hashSync(data['contraseña'], 10);
        }
        if (!data.role) {
            updates.role = 'admin';
        }
    }

    if (Object.keys(updates).length > 0) {
        await updateDoc(ref, updates);
        console.log(`${cleanup ? 'limpiado' : 'actualizado'}: ${data.email}`);
    } else {
        console.log(`sin cambios: ${data.email}`);
    }
}

// El super-admin (root) vivía solo en el .env; se migra a Firestore para que el
// login server-side y el rol root sigan existiendo al eliminar esas variables.
const rootEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const rootPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

if (!cleanup && rootEmail && rootPass) {
    const existing = snapshot.docs.find((d) => d.data().email === rootEmail);

    if (existing) {
        await updateDoc(doc(db, 'admins', existing.id), { role: 'root' });
        console.log(`root asegurado sobre doc existente: ${rootEmail}`);
    } else {
        await addDoc(collection(db, 'admins'), {
            nombre: 'Chaveli',
            email: rootEmail,
            passwordHash: bcrypt.hashSync(rootPass, 10),
            role: 'root',
            estado: true,
        });
        console.log(`root creado: ${rootEmail}`);
    }
}

console.log('Listo.');
process.exit(0);
