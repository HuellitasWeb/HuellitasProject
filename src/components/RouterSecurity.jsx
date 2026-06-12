"use client";

import { useEffect, useContext } from "react";
import { AdminContext } from "./AdminProvider";
import { useRouter, usePathname } from "next/navigation";

export default function RouterSecurity({ children }) {
    const { user, loading } = useContext(AdminContext);
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/auth");
        } else if(user.role=='admin' && pathname=='/dashboard/users'){
            router.push("/dashboard");
        }
    }, [user, loading, pathname, router]);

    return <>{children}</>;
}
