// Almacenamiento de imágenes en CrabStorage (REST). Credenciales server-only.
// Formato verificado con curl:
//   POST   {BASE}/file/store/{projectId}    (FormData 'file') → { files: [{ fileId, url, ... }] }
//   DELETE {BASE}/file/destroy/{projectId}/{fileId}           → { message }
//   URL pública: https://bucket-crabstorage-files.s3.amazonaws.com/storage/{projectId}/{fileId}.{ext}
import 'server-only';

const {
    CRABLABS_BASE_URL,
    CRABLABS_STORAGE_PROJECT_ID,
    CRABLABS_STORAGE_USER_ID,
    CRABLABS_STORAGE_KEY,
    CRABLABS_STORAGE_SECRET,
} = process.env;

const authHeaders = () => ({
    'user-id': CRABLABS_STORAGE_USER_ID,
    'project-key': CRABLABS_STORAGE_KEY,
    'project-secret': CRABLABS_STORAGE_SECRET,
});

// Sube un File/Blob y devuelve su URL pública, o false si falla.
export async function uploadImage(file) {
    if (!file) return false;

    const body = new FormData();
    body.append('file', file);

    try {
        const response = await fetch(
            `${CRABLABS_BASE_URL}/file/store/${CRABLABS_STORAGE_PROJECT_ID}`,
            {
                method: 'POST',
                headers: authHeaders(),
                body,
            }
        );

        if (!response.ok) return false;

        const result = await response.json();
        return result.files?.[0]?.url ?? false;
    } catch (e) {
        console.error('CrabStorage upload:', e);
        return false;
    }
}

// Borra una imagen a partir de su URL pública. Devuelve true/false y nunca lanza:
// las URLs ajenas (p.ej. legado de Firebase Storage) se ignoran devolviendo false.
export async function deleteImage(url) {
    const imageId = getImageId(url);
    if (!imageId) return false;

    try {
        const response = await fetch(
            `${CRABLABS_BASE_URL}/file/destroy/${CRABLABS_STORAGE_PROJECT_ID}/${imageId}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
            }
        );
        return response.ok;
    } catch (e) {
        console.error('CrabStorage delete:', e);
        return false;
    }
}

// El ID es el último segmento de la URL sin extensión (storedName = `${fileId}.{ext}`).
export function getImageId(url) {
    if (!url || typeof url !== 'string') return null;
    if (!url.includes('crabstorage')) return null;

    const filename = url.split('/').pop();
    return filename?.replace(/\.[^/.]+$/, '') || null;
}
