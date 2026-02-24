import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen">
                <Header />

                <main className="flex-1 p-6 bg-muted/40 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
)}