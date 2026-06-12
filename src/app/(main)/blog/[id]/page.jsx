import { getStoryById } from "@/services/services";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";

import History from "../../components/History/History";
import JsonLd from "@/components/JsonLd";

// El artículo viene del editor del panel (Tiptap) pero se guarda como HTML en
// Firestore: se sanitiza con la whitelist de lo que el editor puede producir.
const SANITIZE_OPTIONS = {
    allowedTags: ["h1", "h2", "p", "br", "strong", "em", "u", "ul", "ol", "li", "blockquote", "a"],
    allowedAttributes: { a: ["href", "target", "rel"] },
};


// Los datos de la historia se leen de Firestore en el servidor; ISR de 5 minutos.
export const revalidate = 300;

export async function generateMetadata({ params }) {
   const { id } = await params;
   const story = await getStoryById(id);
   let metadata = {}

   if (story.data) {
      metadata = {
         title: `${story.data.nombre} | Huellitas Cartagena`,
         description: story.data.entradilla,
         alternates: { canonical: `/blog/${id}` },
         openGraph: {
            type: "article",
            title: `${story.data.nombre} | Huellitas Cartagena`,
            description: story.data.entradilla,
            url: `/blog/${id}`,
            images: story.data.imagen ? [story.data.imagen] : undefined,
         },
      }
   }

   return metadata
}

// "dd/mm/yyyy" → "yyyy-mm-dd" (formato ISO para JSON-LD); null si no es parseable.
function fechaToISO(fecha) {
   const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(fecha ?? "");
   return match ? `${match[3]}-${match[2]}-${match[1]}` : null;
}


async function Story({ params }) {
   const { id } = await params;

   const story = await getStoryById(id);

   const blogPostingJsonLd = story.data
      ? {
           "@context": "https://schema.org",
           "@type": "BlogPosting",
           headline: story.data.nombre,
           description: story.data.entradilla,
           image: story.data.imagen || undefined,
           datePublished: fechaToISO(story.data.fecha) || undefined,
           inLanguage: "es-CO",
           mainEntityOfPage: `https://www.huellitasctgna.com/blog/${id}`,
           author: { "@type": "Organization", name: "Fundación Huellitas Cartagena" },
           publisher: { "@type": "Organization", name: "Fundación Huellitas Cartagena" },
        }
      : null;

   return (
      <main className="text-black p-4 w-full max-w-screen-2xl mx-auto h-full">
         {blogPostingJsonLd && <JsonLd data={blogPostingJsonLd} />}
         {story.data ? (
            <>
               <section className="w-[90%] lg:w-9/12 mx-auto">
                  <figure className="relative w-full aspect-video max-h-[320px] lg:max-h-[370px]">
                     <Image
                        className="rounded-3xl object-cover object-center mb-[11px]"
                        src={story.data.imagen}
                        fill
                        alt="Imagen de historia"
                        sizes="100%"
                     />
                  </figure>
                  <span className="italic text-[11px] md:text-[20px]">
                     {story.data.nombre + (story.data.fecha ? ", " + story.data.fecha : "")}
                  </span>
               </section>

               <article
                  id="blogArticle"
                  className="w-[90%] lg:w-9/12 mx-auto mt-[27px]"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.data.articulo, SANITIZE_OPTIONS) }}
               >
               </article>
            </>
         ) : (
            <section className="w-[90%] lg:w-9/12 mx-auto flex items-center  gap-x-[5px]">
               <div className="w-[24px] aspect-square bg-error-icon bg-contain bg-no-repeat"></div>
               <h1 className="text-[#A90000] font-normal text-xl">Historia no encontrada</h1>
            </section>
         )}

         <History />
      </main>
   );
}

export default Story;
