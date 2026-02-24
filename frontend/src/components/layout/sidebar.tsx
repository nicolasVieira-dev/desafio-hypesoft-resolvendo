"use client";

import Link from "next/link";
import { Package, LayoutDashboard, Tags } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="w-64 h-screen border-r bg-background p-4">
            <h1 className="text-xl font-bold mb-8">Hypesoft</h1>

            <nav className="space-y-2">

                <Link
                href="/dashboard"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >

                    <LayoutDashboard size={18} />
                    Dashboard
                </Link>

                <Link
                href="/products"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >

                    <Package size={18} />
                    Products
                </Link>

                <Link
                href="/tags"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >

                    <Tags size={18} />
                    Categorias
                </Link>
            </nav>
        </aside>
    )
}