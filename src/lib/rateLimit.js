// Rate limit en memoria por clave (best-effort; por instancia serverless).
// Reutilizado por api/send-email y api/auth/restore. Cada llamante usa su propia
// clave con prefijo (p.ej. "restore:<ip>") para no compartir el cupo entre rutas.
const buckets = new Map();

export function getClientIp(req) {
    return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

// Devuelve true si la clave superó el límite dentro de la ventana.
export function rateLimit(key, { limit = 3, windowMs = 60 * 60 * 1000 } = {}) {
    const now = Date.now();
    const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

    if (recent.length >= limit) {
        buckets.set(key, recent);
        return true;
    }

    recent.push(now);
    buckets.set(key, recent);
    return false;
}
