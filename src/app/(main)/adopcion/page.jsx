import FAQ_Adoption from "../components/FAQ_Adopcion/FAQ_Adoption";
import CardWrapper from "./components/CardWrapper/CardWrapper";

export const metadata = {
    title: 'Adopción | Huellitas Cartagena',
    description: 'Explora nuestra página de adopción para conocer a los animales que esperan encontrar una familia. Revisa los perfiles de nuestros adorables refugiaditos y consulta nuestra sección de preguntas frecuentes para obtener toda la información necesaria sobre el proceso de adopción. Tu próximo compañero de vida podría estar aquí esperando por ti.',
}

let faq = [
    {
        id: 1,
        title: "¿Cuáles son los pasos para adoptar?",
        par: "Inicialmente deben diligenciar un formulario y posterior a eso se agendará una entrevista virtual por la app MEET. Si todos los pasos se dan de forma exitosa se dará la adopción de la mascota.",
    },
    {
        id: 2,
        title: "¿Cuáles son los requisitos para adoptar?",
        par: "Inicialmente no pertenecer a una comunidad de sobrepoblación animal, de esta forma tratamos de concientizar para que le brinden la oportunidad a un animal de su barrio. Dependiendo de la mascota deseada tendrían que cumplir con chequeos médicos, vacunas o esterilización.",
    },
    {
        id: 3,
        title: "¿Tiene algún costo?",
        par: "Cuando la mascota ha pasado por un proceso de veterinaria pedimos una donación mínima de $50.000,00 cop. Esto con la intención de poder abonar a las cuentas pendientes de esta misma.",
    },
];

function Adopcion() {
    return (
        <main>
            <section
                className="w-full h-72 lg:bg-tertiaryColor shadow-[0_6px_6px_-2px_rgba(0,0,0,0.3)]"
                role="section"
            >
                <div className="flex w-full h-full max-w-screen-2xl mx-auto items-end lg:justify-center lg:items-center p-8 lg:p-0 lg:py-16 bg-adoption-banner lg:bg-none bg-cover bg-opacity-80 ">
                    <div className="flex flex-col w-[60%] lg:w-9/12 gap-8">
                        <h1 className="font-bold heading-1 !text-white lg:!text-primaryFont">
                            ADOPTALOS
                        </h1>
                        <p className="hidden lg:block font-normal par-3 text-justify">
                            Te recordamos que al adoptar un animal deberás tener
                            la tenencia responsable de este por al menos entre
                            10 a 20 años, según el tiempo de vida de la mascota.
                            Tener muy en cuenta que sin ningún tipo de excusa
                            debemos velar por ellos tanto en buenas situaciones
                            como en las malas situaciones.
                        </p>
                    </div>
                </div>
            </section>

            <section
                id="buscamos"
                className="flex w-full max-w-screen-2xl mx-auto justify-center items-center py-8 md:py-10 lg:py-16"
                role="section"
            >
                <div className="flex flex-col w-[90%] lg:w-9/12 gap-y-20">
                    <h2 className="hidden lg:block font-bold heading-1">
                        BUSCAMOS UN HOGAR CON AMOR
                    </h2>
                    <div
                        className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 lg:px-0 gap-x-4 lg:gap-x-16 gap-y-20"
                        role="list"
                    >
                        <CardWrapper />
                    </div>
                </div>
            </section>

            <section id="faq" className="bg-tertiaryColor" role="section">
                <FAQ_Adoption items={faq} />
            </section>
        </main>
    );
}

export default Adopcion;
