import Link from "next/link";

import RestoreForm from "./RestoreForm";

export const metadata = {
    title: "Recuperar contraseña | Huellitas Cartagena",
};

function Restore() {
    return (
        <main className="grid lg:grid-cols-2 h-[calc(100vh-3.5rem)] min-h-[45rem]">
            <section className="bg-[url('/assets/Login/bg_login.png')] bg-center bg-cover hidden lg:block">
                <span className="sr-only">
                    Imagen de un perro con su dueño, felices.
                </span>
            </section>
            <section className="flex flex-col gap-6 items-center justify-center bg-primaryColor p-1">
                <img
                    src="/assets/Login/logo_login.png"
                    alt="logo de Huellitas Cartagena conformado por un perrito y un gato."
                    className="w-[15rem]"
                />
                <h1 className="font-semibold text-3xl text-center">
                    Recuperar contraseña
                </h1>
                <p className="text-white text-center text-sm max-w-[26.935rem] px-4">
                    Escribe el correo de tu cuenta y te enviaremos una nueva
                    contraseña temporal.
                </p>

                <RestoreForm />

                {/** Contenedor para hacer una linea de decoración */}
                <div className="mt-10 h-[1px] w-[75%] bg-white"></div>

                <Link href={'/auth'} className="hover:underline">
                    Volver a iniciar sesión
                </Link>
            </section>
        </main>
    );
}

export default Restore;
