"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

function RestoreForm() {
    const [sent, setSent] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit({ email }) {
        try {
            await fetch("/api/auth/restore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
        } catch (e) {
            console.error(e);
        }
        // Siempre mostramos el mismo mensaje genérico (anti-enumeración):
        // no revelamos si el correo estaba registrado.
        setSent(true);
    }

    if (sent) {
        return (
            <section className="text-white text-center max-w-[26.935rem] px-4">
                Si el correo está registrado, te enviamos una nueva contraseña.
                Revisa tu bandeja de entrada (y la carpeta de spam).
            </section>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 items-center text-black w-full"
        >
            <input
                className="w-[75vw] shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-w-[26.935rem] p-3 rounded-[2rem]"
                placeholder="Email"
                type="email"
                {...register("email", { required: true })}
            />
            {errors.email && (
                <section className="text-white drop-shadow-[0_0px_5px_rgba(255,0,0,1)]">
                    Ingresa tu correo.
                </section>
            )}
            <button
                className="transition-all durartion-200 hover:text-black hover:bg-white text-white border-2 w-fit font-medium py-2 px-10 rounded-[2rem] disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Enviando..." : "Enviar nueva contraseña"}
            </button>
        </form>
    );
}

export default RestoreForm;
