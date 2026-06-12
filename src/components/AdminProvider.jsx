"use client";

import { useContext, createContext, useState, useEffect } from "react";

export const AdminContext = createContext();
export const useAdminContext = () => useContext(AdminContext);

export function AdminProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUser = (anUser) => {
        setUser(anUser);
    };

    useEffect(() => {
        let cancelled = false;

        fetch("/api/auth/me")
            .then((res) => (res.ok ? res.json() : null))
            .then((sessionUser) => {
                if (!cancelled && sessionUser) {
                    setUser(sessionUser);
                }
            })
            .catch(() => {})
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <AdminContext.Provider value={{ user, updateUser, loading }}>
            {children}
        </AdminContext.Provider>
    );
}
