import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { Poppins } from "next/font/google";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const SITE_URL = "https://www.huellitasctgna.com";

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Huellitas Cartagena",
    description:
        "La fundación Huellitas Cartagena se dedica al rescate y cuidado de animales en Cartagena de Indias. Explora nuestro sitio para conocer más sobre nuestras actividades, cómo trabajamos para proteger y mejorar la vida de los animales, y cómo puedes contribuir a nuestra causa.",
    openGraph: {
        type: "website",
        locale: "es_CO",
        url: "/",
        siteName: "Huellitas Cartagena",
    },
};
export const viewport = {
    themeColor: '#6C5CE7',
}

const NGO_JSONLD = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Fundación Huellitas Cartagena",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logos/png/logoHuellitas.png`,
    description:
        "Fundación dedicada al rescate de animales domésticos y la educación social en Cartagena de Indias, Colombia.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Cartagena de Indias",
        addressCountry: "CO",
    },
    sameAs: [
        "https://www.instagram.com/huellitas.ctgna/",
        "https://www.tiktok.com/@huellitascartagena",
    ],
};

const WEBSITE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Huellitas Cartagena",
    url: SITE_URL,
    inLanguage: "es-CO",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={poppins.className}>
            <body>
                <JsonLd data={NGO_JSONLD} />
                <JsonLd data={WEBSITE_JSONLD} />
                {children}
            </body>
        </html>
    );
}
