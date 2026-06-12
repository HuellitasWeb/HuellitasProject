import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { WHATSAPP_GROUPS } from '@/lib/whatsappGroups';

function GruposWhatsApp() {
    return (
        <section className="flex flex-col w-full max-w-screen-2xl mx-auto justify-center items-center gap-8 py-16 bg-white">
            <h2 className="w-11/12 lg:w-9/12 lg:font-bold heading-1 lg:text-left font-semibold text-h1-m">
                ÚNETE A NUESTROS GRUPOS
            </h2>
            <div className="w-11/12 lg:w-9/12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(WHATSAPP_GROUPS).map(([key, group]) => (
                    <article
                        key={key}
                        className="flex flex-col gap-4 bg-primaryColor rounded-3xl py-6 px-6 lg:px-10"
                    >
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-white/15 text-white">
                            <WhatsAppIcon className="w-7 h-7" />
                        </div>
                        <h3 className="par-1 !text-white font-semibold uppercase">{group.titulo}</h3>
                        <p className="par-3 !text-white text-justify">{group.descripcion}</p>
                        <a
                            href={group.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondary-btn !text-white !border-white w-fit mt-auto"
                        >
                            Unirme al grupo
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default GruposWhatsApp;
