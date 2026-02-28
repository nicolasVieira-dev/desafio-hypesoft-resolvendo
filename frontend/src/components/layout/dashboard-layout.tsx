"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { AppSidebar } from "@/components/layout/app-sidebar";

export function DashboardLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <header className="border-b px-6 py-4 flex justify-between items-center">
          <div className="text-xl text-muted-foreground">
            Olá, <span className="font-semibold">{(session.user?.name ?? session.user?.email)?.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
          </div>

          <LogoutButton />
        </header>

        <main className="p-6 flex-1 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}