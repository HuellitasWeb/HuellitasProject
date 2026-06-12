import Slider from '../Slider/Slider'
import { getRef, formatData } from "@/services/services";

// Server Component: lee las historias de Firestore en el servidor, así el
// carrusel llega renderizado (HTML indexable, sin salto de layout por fetch).
async function History() {
    let items = null;
    try {
        const ref = await getRef("historias");
        items = ref ? formatData(ref) : null;
    } catch (e) {
        console.error("History: no se pudieron leer las historias", e);
    }

    return (
        <section className='flex flex-col w-full max-w-screen-2xl mx-auto justify-center items-center gap-8 py-8 md:py-10 lg:py-16 bg-white'>
            <h2 className='w-[90%] lg:w-9/12 font-bold heading-1 text-left'>SIGUE SUS HISTORIAS</h2>
            {items && items.length > 0 && <Slider items={items} type={0} def={1} md={2} lg={3} loop={true} nav={true}></Slider>}
        </section>

    )
}

export default History
