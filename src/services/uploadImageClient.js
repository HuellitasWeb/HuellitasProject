// Sube una imagen desde el navegador vía /api/upload (que la guarda en
// CrabStorage con credenciales server-only) y devuelve su URL pública.
export async function uploadImageClient(file) {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body });

    if (!res.ok) {
        throw new Error("No se pudo subir la imagen");
    }

    const { url } = await res.json();
    return url;
}
