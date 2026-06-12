const SITE_URL = "https://www.huellitasctgna.com";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/auth", "/api"],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
