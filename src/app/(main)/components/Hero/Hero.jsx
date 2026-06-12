import Link from "next/link";
import { getImageProps } from "next/image";

function Hero() {
    // Art direction: misma pareja de banners que usaban las clases
    // bg-hero-banner-sm / lg:bg-hero-banner-lg, pero como <img> optimizada
    // (preload scanner + fetchpriority) en vez de background-image CSS.
    const common = { alt: "", fill: true, sizes: "100vw", className: "object-cover" };

    const {
        props: { srcSet: desktopSrcSet },
    } = getImageProps({ ...common, src: "/assets/Hero/banner-lg.jpg" });

    const { props: mobileImgProps } = getImageProps({
        ...common,
        src: "/assets/Hero/banner-sm.jpg",
        priority: true,
        fetchPriority: "high",
    });

    return (
        <section className='flex flex-col relative w-full h-80 lg:h-96 max-w-screen-2xl mx-auto' role="banner">
            <picture>
                {/* lg de Tailwind = 1024px, mismo breakpoint que tenía el background */}
                <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
                <img {...mobileImgProps} />
            </picture>
            <div className='flex absolute w-full lg:w-6/12 h-full items-end lg:justify-center lg:items-center p-4 lg:px-16 lg:py-0 lg:bg-transparent'>
                <div className='flex flex-col w-full lg:w-[60%] gap-4 lg:items-start'>
                    <h1 className='font-bold heading-1 !text-white'>Huellitas Cartagena</h1>
                    <p className='hidden lg:block font-medium par-3 !text-white text-center lg:text-left md:text-left'>Somos una fundación dedicada al rescate de animales domésticos y la educación social sobre esta problemática. Nuestra misión es crear conciencia para mitigar el hambre, abandono, maltrato y la sobrepoblación animal.</p>
                    <Link href="/fundacion"><button className='w-fit secondary-btn !text-white !border-white'>SABER MÁS...</button></Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
