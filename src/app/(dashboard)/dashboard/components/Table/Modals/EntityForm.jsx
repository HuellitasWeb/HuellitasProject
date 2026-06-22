"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputImg from "../../InputImg/InputImg";
import { uploadImageClient } from "@/services/uploadImageClient";
import { successMessage, errorMessage } from "@/services/notify";

const INPUT_CLASS = "field-input";
const SELECT_CLASS = "field-input";
const LABEL_CLASS = "field-label";

// Config de campos por colección. Los `select` se guardan como int (parseInt),
// igual que hacía el formulario original. `addOnly` solo se muestra al crear.
const FIELDS = {
    adopciones: [
        { name: "nombre", label: "Nombre", type: "text", required: "El nombre es obligatorio" },
        { name: "caracteristicas", label: "Características", type: "textarea", required: "Las características son obligatorias" },
        { name: "edad", label: "Edad", type: "number", required: "La edad es obligatoria" },
        { name: "type", label: "Años/Meses", type: "select", options: [{ value: 0, label: "Años" }, { value: 1, label: "Meses" }] },
        { name: "genero", label: "Género", type: "select", options: [{ value: 1, label: "Macho" }, { value: 0, label: "Hembra" }] },
        { name: "historia", label: "Historia", type: "textarea", required: "La historia es obligatoria" },
    ],
    sponsors: [
        { name: "nombre", label: "Nombre", type: "text", required: "El nombre es obligatorio" },
    ],
    admins: [
        { name: "nombre", label: "Nombre", type: "text", required: "El nombre es obligatorio" },
        { name: "email", label: "Email", type: "email", required: "El email es obligatorio" },
        { name: "password", label: "Contraseña", type: "password", required: "La contraseña es obligatoria", addOnly: true },
    ],
    vaki: [
        { name: "titulo", label: "Título", type: "text", required: "El título es obligatorio" },
        { name: "descripcion", label: "Descripción", type: "textarea", required: "La descripción es obligatoria" },
        { name: "enlace", label: "Enlace de la vaca (VAKI)", type: "text", required: "El enlace es obligatorio" },
        { name: "activo", label: "Estado", type: "select", options: [{ value: 1, label: "Activa" }, { value: 0, label: "Inactiva" }] },
    ],
};

// Formulario único de alta/edición para adopciones, sponsors y admins.
// Reemplaza a los antiguos ModalAdd/ModalMod.
function EntityForm({ item = null, closeCallback, config }) {
    const isEdit = Boolean(item);
    const collection = config.collection;
    const fields = FIELDS[collection] ?? [];
    const withImage = collection !== "admins" && collection !== "vaki";

    const [selectedImage, setSelectedImage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: isEdit ? item.data : {},
    });

    async function onSubmit(values) {
        try {
            const data = {};
            for (const field of fields) {
                if (field.addOnly && isEdit) continue;
                data[field.name] =
                    field.type === "select"
                        ? Number.parseInt(values[field.name], 10)
                        : values[field.name];
            }

            if (withImage && selectedImage) {
                data.imagen = await uploadImageClient(selectedImage);
            }

            const payload = isEdit
                ? { id: item.id, data, oldImageUrl: data.imagen ? item.data.imagen : undefined }
                : { data };

            const res = await fetch("/api/" + collection, {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("La operación falló");
            }

            successMessage("Operación exitosa!");
            closeCallback();
        } catch (e) {
            console.error(e);
            errorMessage("Algo salió mal, intente más tarde");
        }
    }

    return (
        <div id="crud-modal" className="modal-overlay">
            <div className="modal-card max-w-md">
                <div className="modal-header">
                    <h3 className="modal-title">
                        {isEdit ? "Modificar" : "Añadir"}
                    </h3>
                    <button
                        onClick={closeCallback}
                        type="button"
                        className="modal-close"
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Cerrar</span>
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="modal-body"
                >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        {fields.map((field) => {
                            if (field.addOnly && isEdit) return null;

                            return (
                                <div className="col-span-2" key={field.name}>
                                    <label htmlFor={field.name} className={LABEL_CLASS}>
                                        {field.label}
                                    </label>

                                    {field.type === "textarea" ? (
                                        <textarea
                                            id={field.name}
                                            rows="4"
                                            placeholder={field.label}
                                            className={INPUT_CLASS}
                                            {...register(field.name, { required: field.required })}
                                        />
                                    ) : field.type === "select" ? (
                                        <select
                                            id={field.name}
                                            className={SELECT_CLASS}
                                            {...register(field.name)}
                                        >
                                            {field.options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            placeholder={field.label}
                                            className={INPUT_CLASS}
                                            {...register(field.name, { required: field.required })}
                                        />
                                    )}

                                    {errors[field.name] && (
                                        <p className="field-error">
                                            {errors[field.name].message}
                                        </p>
                                    )}
                                </div>
                            );
                        })}

                        {withImage && (
                            <div className="col-span-2">
                                <label htmlFor="image" className={LABEL_CLASS}>
                                    Imagen
                                </label>
                                <InputImg add={!isEdit} data={{ selectedImage, setSelectedImage }} />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full"
                    >
                        {isSubmitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Agregar"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EntityForm;
