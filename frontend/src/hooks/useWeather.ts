import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/services/weather";
import { use } from "react";

export function useWeather() {
    return useQuery({
        queryKey: ["weather"],
        queryFn: getWeather,
    });
}