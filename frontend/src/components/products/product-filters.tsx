"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import { useCategories } from "@/hooks/useCategories";

export function ProductFilters({
    search,
    onSearchChange,
    categoryId,
    onCategoryChange,
}: {
    search: string;
    onSearchChange: (v: string) => void;
    categoryId: string;
    onCategoryChange: (v: string) => void;
}) {
    const { data: categories = [] } = useCategories();

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="md:max-w-xs"
            />
            <Select value={categoryId} onValueChange={onCategoryChange}>
                <SelectTrigger className="md:max-w-xs">
                    <SelectValue placeholder="Filtra por categoría" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="all">todas</SelectItem>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                                {c.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
