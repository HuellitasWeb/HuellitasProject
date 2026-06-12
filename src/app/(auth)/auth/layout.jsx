import { AdminProvider } from "@/components/AdminProvider";

function layout({ children }) {
    return (
        <AdminProvider>
            {children}
            <footer className="flex bg-[#585564] h-14 justify-center items-center">
                Diseño y Programación:
                <a
                    className="ml-2 font-bold hover:text-blue-300"
                    href="https://inkua.de/what-is-inkua"
                    target="_blank"
                >
                    InkuA
                </a>
            </footer>
        </AdminProvider>
    )
}

export default layout
