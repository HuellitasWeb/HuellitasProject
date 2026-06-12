import { getRef, formatData } from "@/services/services";

const SITE_URL = "https://www.huellitasctgna.com";

export const revalidate = 86400;

export default async function sitemap() {
    const staticRoutes = ["", "/fundacion", "/adopcion", "/colaboracion", "/contacto"].map(
        (path) => ({
            url: `${SITE_URL}${path}`,
            changeFrequency: "weekly",
            priority: path === "" ? 1 : 0.8,
        })
    );

    let storyRoutes = [];
    try {
        const ref = await getRef("historias");
        storyRoutes = formatData(ref).map(({ id }) => ({
            url: `${SITE_URL}/blog/${id}`,
            changeFrequency: "monthly",
            priority: 0.6,
        }));
    } catch (e) {
        console.error("sitemap: no se pudieron leer las historias", e);
    }

    return [...staticRoutes, ...storyRoutes];
}
