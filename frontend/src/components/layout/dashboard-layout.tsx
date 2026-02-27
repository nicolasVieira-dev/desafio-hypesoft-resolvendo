import { Sidebar } from "./sidebar";

export function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen">
                

                <main className="flex-1 p-6 bg-muted/40 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
)}