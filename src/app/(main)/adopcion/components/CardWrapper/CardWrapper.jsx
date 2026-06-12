import Card from "../Card/Card";
import { getRef, formatData } from "@/services/services";

// Server Component: los animales en adopción llegan en el HTML inicial
// (indexable por crawlers) en lugar de cargarse con fetch en el cliente.
export default async function CardWrapper() {
    let animals = null;
    try {
        const ref = await getRef("adopciones");
        animals = ref ? formatData(ref) : null;
    } catch (e) {
        console.error("CardWrapper: no se pudieron leer las adopciones", e);
    }

    return (
        <>
            {animals &&
                animals.map((animal) => (
                    <Card
                        key={animal.id}
                        name={animal.data.nombre}
                        age={animal.data.edad}
                        gender={animal.data.genero}
                        story={animal.data.historia}
                        characteristics={animal.data.caracteristicas}
                        source={animal.data.imagen}
                        type={animal.data.type}
                        role={"listItem"}
                    />
                ))}
        </>
    );
}
