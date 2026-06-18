"use client";

import Image from "next/image";
import useCollection from "@/hooks/useCollection";

function VakiCard({ children }) {
    return (
        <article className="relative overflow-hidden flex flex-col gap-4 bg-primaryColor rounded-3xl py-8 px-6 lg:px-10">
            {/* Mascota VAKI como marca de agua tenue */}
            <Image
                src="/assets/logos/svg/isotype-vaki.svg"
                alt=""
                aria-hidden="true"
                width={220}
                height={220}
                className="pointer-events-none select-none absolute -right-6 -bottom-8 w-40 lg:w-56 opacity-10"
            />
            <Image
                src="/assets/logos/svg/vaki-logo-white&green.svg"
                alt="VAKI"
                width={73}
                height={45}
                className="w-20 lg:w-24"
            />
            {children}
        </article>
    );
}

function VakiSection() {
    const { data } = useCollection("vaki");
    const activa = Array.isArray(data) ? data.find((v) => v.data.activo) : null;

    return (
        <section
            id="vaki"
            className="flex flex-col w-full max-w-screen-2xl mx-auto justify-center items-center gap-8 py-16 bg-white"
        >
            <h2 className="w-11/12 lg:w-9/12 lg:font-bold heading-1 lg:text-left font-semibold text-h1-m">
                APOYA NUESTRA VAKI
            </h2>

            <div className="w-11/12 lg:w-9/12">
                {activa ? (
                    <VakiCard>
                        <span className="relative z-10 flex items-center gap-2 w-fit">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vakiGreen opacity-75"></span>
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vakiGreen"></span>
                            </span>
                            <span className="par-3 !text-white uppercase font-semibold">
                                Recolecta activa
                            </span>
                        </span>
                        <h3 className="relative z-10 par-1 !text-white font-semibold uppercase">
                            {activa.data.titulo}
                        </h3>
                        <p className="relative z-10 par-3 !text-white text-justify max-w-2xl whitespace-pre-line">
                            {activa.data.descripcion}
                        </p>
                        <a
                            href={activa.data.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 w-fit mt-2 uppercase text-p3-m lg:text-p3-w font-medium text-white bg-vakiGreen hover:bg-[#7ab536] rounded-full px-6 py-2.5 shadow-md transition-all duration-150"
                        >
                            Aportar en VAKI
                        </a>
                    </VakiCard>
                ) : (
                    <VakiCard>
                        <span className="relative z-10 flex items-center gap-2 w-fit rounded-full bg-white/15 px-3 py-1">
                            <span className="par-3 !text-white uppercase font-semibold">
                                Próximamente
                            </span>
                        </span>
                        <h3 className="relative z-10 par-1 !text-white font-semibold uppercase">
                            Pronto abriremos una nueva vaki
                        </h3>
                        <p className="relative z-10 par-3 !text-white text-justify max-w-2xl">
                            En este momento no tenemos una recolecta activa. Mantente
                            pendiente de nuestras redes para enterarte de la próxima, y
                            mientras tanto puedes ayudarnos de muchas otras formas.
                        </p>
                        <a
                            href="#colaborar"
                            className="relative z-10 secondary-btn !text-white !border-white w-fit mt-2"
                        >
                            Ver otras formas de colaborar
                        </a>
                    </VakiCard>
                )}
            </div>
        </section>
    );
}

export default VakiSection;
