import Hero from "./components/Hero/Hero";
import History from "./components/History/History";
import Sumate from "./components/Sumate/Sumate";
import FAQ_Home from "./components/FAQ_Adopcion/FAQ_Home";

export const metadata = {
    title: "Huellitas Cartagena | Adopción y rescate animal en Cartagena de Indias",
    description:
        "Fundación dedicada al rescate y adopción de perros y gatos en Cartagena de Indias. Conoce a los animales que buscan hogar, sus historias y cómo puedes colaborar.",
    alternates: { canonical: "/" },
};

// Los datos de historias se leen de Firestore en el servidor; ISR de 5 minutos.
export const revalidate = 300;

export default function Home() {
    return (
        <main className="">
            <Hero />
            <History />
            <Sumate />
            <FAQ_Home />
        </main>
    )
}
