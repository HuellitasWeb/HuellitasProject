"use client";

import { useForm } from "react-hook-form";
import { successMessage, errorMessage } from "@/services/notify";

function Cuenta() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const newPassword = watch("newPassword");

    async function onSubmit(values) {
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                errorMessage(body.error ?? "No se pudo cambiar la contraseña");
                return;
            }

            successMessage(
                "Contraseña actualizada. Vuelve a iniciar sesión para mayor seguridad."
            );
            reset();
        } catch (e) {
            console.error(e);
            errorMessage("Algo salió mal, intenta más tarde");
        }
    }

    return (
        <div className="my-12 max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-primaryFont mb-2">Mi cuenta</h1>
            <p className="text-sm text-grayFont mb-6">
                Cambia la contraseña con la que ingresas al panel.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div>
                    <label htmlFor="currentPassword" className="field-label">
                        Contraseña actual
                    </label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="field-input"
                        {...register("currentPassword", {
                            required: "Ingresa tu contraseña actual",
                        })}
                    />
                    {errors.currentPassword && (
                        <p className="field-error">{errors.currentPassword.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="newPassword" className="field-label">
                        Nueva contraseña
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        className="field-input"
                        {...register("newPassword", {
                            required: "Ingresa la nueva contraseña",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" },
                        })}
                    />
                    {errors.newPassword && (
                        <p className="field-error">{errors.newPassword.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="field-label">
                        Confirmar nueva contraseña
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="field-input"
                        {...register("confirmPassword", {
                            required: "Confirma la nueva contraseña",
                            validate: (v) =>
                                v === newPassword || "Las contraseñas no coinciden",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="field-error">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                >
                    {isSubmitting ? "Guardando..." : "Cambiar contraseña"}
                </button>
            </form>
        </div>
    );
}

export default Cuenta;
