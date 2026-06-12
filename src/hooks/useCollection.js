"use client";

import useSWR from "swr";

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Error al cargar los datos");
    }
    return res.json();
};

// Datos de una colección del dashboard vía SWR. Refrescar con `mutate()`
// tras crear/editar/borrar.
export default function useCollection(name) {
    const { data, error, isLoading, mutate } = useSWR(`/api/${name}`, fetcher);
    return { data, error, isLoading, mutate };
}
