"use client";

import Link from "next/link";
import { AdminContext } from "@/components/AdminProvider";
import { useContext } from "react";
import { usePathname } from "next/navigation";

const LOGOUT_BTN =
    "inline-flex items-center rounded-lg border border-white/40 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white hover:text-primaryColor";

export default function Navigation() {
    const { updateUser, user } = useContext(AdminContext)
    const path = usePathname()

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST", keepalive: true });
        } catch (e) {
            console.error(e);
        }
        updateUser(null)
    }

    const links = [
        { href: "/dashboard", label: "HISTORIAS" },
        { href: "/dashboard/adopciones", label: "ADOPCIÓN" },
        { href: "/dashboard/sponsors", label: "SPONSORS" },
        { href: "/dashboard/vaki", label: "VAKI" },
        ...(user?.role === "root" ? [{ href: "/dashboard/users", label: "USUARIOS" }] : []),
        { href: "/", label: "WEB" },
    ];

    return (
        <nav className="bg-primaryColor text-tertiaryColor">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="hidden md:flex md:h-20 items-center justify-between">
                    <div className="flex items-center gap-1">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`nav-link ${path === l.href ? "nav-link-active" : ""}`}
                                aria-current={path === l.href ? "page" : undefined}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <Link onClick={handleLogout} href="/auth" className={LOGOUT_BTN}>
                        Cerrar sesión
                    </Link>
                </div>
            </div>

            <div className="md:hidden p-4">
                <div className="flex flex-wrap items-center justify-center gap-1">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10 ${path === l.href ? "bg-white/15 font-semibold" : ""}`}
                            aria-current={path === l.href ? "page" : undefined}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
                <div className="mt-8 flex justify-center">
                    <Link onClick={handleLogout} href="/auth" className={LOGOUT_BTN}>
                        Cerrar sesión
                    </Link>
                </div>
            </div>
        </nav>
    );
}
