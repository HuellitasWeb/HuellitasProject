// Generación de contraseñas aleatorias seguras (node:crypto, nunca Math.random()).
// La usa la ruta de reseteo (/api/auth/restore). El script scripts/create-admin.mjs
// duplica esta lógica de forma inline porque Node trata los .js como CommonJS
// (no hay "type":"module" en package.json) y no podría importar este módulo ESM.
import { randomInt } from 'node:crypto';

// Alfabeto legible: sin caracteres ambiguos (0/O, 1/l/I).
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';

export function generatePassword(len = 12) {
    let out = '';
    for (let i = 0; i < len; i++) {
        out += ALPHABET[randomInt(ALPHABET.length)];
    }
    return out;
}
