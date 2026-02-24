import { api } from "./api";
import { Weather } from "@/types/weather";

export async function getWeather(): Promise<Weather[]> {
    const response = await api.get<Weather[]>("/weatherforecast");
    return response.data;
}