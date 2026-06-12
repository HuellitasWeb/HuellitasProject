"use client";

import { ToastContainer } from 'react-toastify';

import Navigation from "./components/Navigation/Navigation";
import RouterSecurity from "@/components/RouterSecurity";
import { AdminProvider } from "@/components/AdminProvider";


export default function layout({ children }) {
    return (
        <AdminProvider>
            <div className="min-h-full">
                <RouterSecurity>

                        <Navigation />
                        <main>
                            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 overflow-x-auto">
                                {children}
                            </div>
                        </main>

                </RouterSecurity>
                <ToastContainer />
            </div>
        </AdminProvider>
    );
}
