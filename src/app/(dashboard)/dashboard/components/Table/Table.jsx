"use client";

import styles from "@/app/(main)/components/styles/loading.module.css"

import { useState } from "react";
import EntityForm from "./Modals/EntityForm";
import StoriesModal from "../StoriesModal/StoriesModal";

import { successMessage, errorMessage } from "@/services/notify";

function Table({ data, refresh, config, stories = false }) {
    const [isModalAddActive, setIsModalAddActive] = useState(false);
    const [isModalModActive, setIsModalModActive] = useState(false);
    const [storiesModalAdd, setStoriesModalAdd] = useState(false);
    const [storiesModalMod, setStoriesModalMod] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [busyId, setBusyId] = useState(null);

    function handleModify(item) {
        if (stories) {
            setStoriesModalMod(true);
        } else {
            setIsModalModActive(true);
        }
        setSelectedItem(item);
    }

    function handleCreate() {
        setIsModalAddActive(true);
    }

    function handleModalModClose() {
        setIsModalModActive(false);
        setSelectedItem(null);
        refresh();
    }

    function handleModalAddClose() {
        setIsModalAddActive(false);
        refresh();
    }

    async function handleRemove(item) {
        const label = item.data.nombre ?? item.data.titulo ?? "este registro";
        if (!window.confirm(`¿Eliminar "${label}"? Esta acción no se puede deshacer.`)) {
            return;
        }

        setBusyId(item.id);
        try {
            const res = await fetch("/api/" + config.collection, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item }),
            });

            if (!res.ok) {
                throw new Error("La operación falló");
            }

            successMessage('Operación exitosa!')
            refresh();
        } catch (error) {
            errorMessage('Algo salió mal, intente más tarde')
            console.error(error);
        } finally {
            setBusyId(null);
        }
    }

    return (
        <div>
            <div className="relative overflow-x-auto pb-10">
                {stories ? (
                    <button
                        onClick={() => setStoriesModalAdd(true)}
                        type="button"
                        className="btn-primary my-4"
                    >
                        Añadir
                    </button>
                ) : (
                    <button
                        onClick={handleCreate}
                        type="button"
                        className="btn-primary my-4"
                    >
                        Añadir
                    </button>
                )}
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            {/* Fields only for admins page */}
                            {config.collection == "admins" && (
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                            )}

                            {/* Fields only for adoptions page */}
                            {config.collection == "adopciones" && (
                                <th scope="col" className="px-6 py-3">
                                    Características
                                </th>
                            )}

                            {/* Fields only for stories page */}
                            {config.collection == "historias" && (
                                <th scope="col" className="px-6 py-3">
                                    Entradilla
                                </th>
                            )}

                            {/* Fields only for vaki page */}
                            {config.collection == "vaki" && (
                                <>
                                    <th scope="col" className="px-6 py-3">
                                        Enlace
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Estado
                                    </th>
                                </>
                            )}

                            {/* Fields for all pages except admins and vaki */}
                            {config.collection != "admins" && config.collection != "vaki" && (
                                <th scope="col" className="px-6 py-3">
                                    Imagen
                                </th>
                            )}
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Editar</span>
                            </th>
                        </tr>
                    </thead>
                    {data && (
                        <tbody className="">
                            {data?.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className="h-32"
                                    >
                                        <th
                                            scope="row"
                                            className="font-medium text-primaryFont whitespace-nowrap"
                                        >
                                            {item.data.nombre ?? item.data.titulo}
                                        </th>

                                        {/* Fields only for admins page */}
                                        {config.collection == "admins" && (
                                            <td className="whitespace-nowrap max-w-60 overflow-auto">
                                                {item.data.email}
                                            </td>
                                        )}

                                        {/* Fields only for adoptions page */}
                                        {config.collection == "adopciones" && (
                                            <td className="whitespace-nowrap max-w-60 overflow-auto">
                                                {item.data.caracteristicas}
                                            </td>
                                        )}

                                        {/* Fields only for stories page */}
                                        {config.collection == "historias" && (
                                            <td className="whitespace-nowrap max-w-60 overflow-auto">
                                                {item.data.entradilla}
                                            </td>
                                        )}

                                        {/* Fields only for vaki page */}
                                        {config.collection == "vaki" && (
                                            <>
                                                <td className="max-w-60 overflow-auto">
                                                    <a
                                                        href={item.data.enlace}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primaryColor underline break-all"
                                                    >
                                                        {item.data.enlace}
                                                    </a>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <span
                                                        className={
                                                            "inline-flex rounded-full px-3 py-1 text-xs font-medium " +
                                                            (item.data.activo
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-gray-100 text-gray-600")
                                                        }
                                                    >
                                                        {item.data.activo ? "Activa" : "Inactiva"}
                                                    </span>
                                                </td>
                                            </>
                                        )}

                                        {/* Fields for all pages except admins and vaki */}
                                        {config.collection != "admins" && config.collection != "vaki" && (
                                            <td className="min-w-[10rem]">
                                                <img
                                                    className="h-24 w-24 object-cover rounded-lg"
                                                    src={item.data.imagen}
                                                    alt="Imagen de un perrito"
                                                />
                                            </td>
                                        )}

                                        <td className="text-right min-w-[15rem]">
                                            {config.collection != "admins" && (
                                                <button
                                                    onClick={() =>
                                                        handleModify(item)
                                                    }
                                                    className="btn-ghost btn-sm mr-2"
                                                >
                                                    Modificar
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleRemove(item)
                                                }
                                                disabled={busyId === item.id}
                                                className="btn-danger btn-sm"
                                            >
                                                {busyId === item.id ? "Eliminando..." : "Eliminar"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>

                {storiesModalMod && (
                    <StoriesModal
                        isOpen={{ setStoriesModalMod }}
                        add={false}
                        item={selectedItem}
                        refresh={refresh}
                    />
                )}

                {isModalModActive && (
                    <EntityForm
                        item={selectedItem}
                        closeCallback={handleModalModClose}
                        config={config}
                    />
                )}

                {isModalAddActive && (
                    <EntityForm
                        closeCallback={handleModalAddClose}
                        config={config}
                    />
                )}

                {storiesModalAdd && (
                    <StoriesModal isOpen={{ setStoriesModalAdd }} refresh={refresh} />
                )}
            </div>
            {!data && <div className={styles.loadingBox + " " + "mx-auto"}></div>}
        </div>
    );
}

export default Table;
