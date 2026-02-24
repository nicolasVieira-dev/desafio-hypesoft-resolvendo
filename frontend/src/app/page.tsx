"use client";

import {useWeather } from "@/hooks/useWeather";
import { Button } from "@/components/UI/button";

export default function Home() {
  const { data, isLoading, error } = useWeather();
  
  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Eaiiiiiiii
      </h1>
      <div className="">
        TAilwind
      </div>

    <div className="p-10">
      <Button>Hypesoft Dashboard 🚀</Button>
    </div>

      <pre>{JSON.stringify(data, null, 2)}</pre>

    </main>
  )
}