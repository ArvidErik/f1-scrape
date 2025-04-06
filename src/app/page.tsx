"use client";
import StandingCard from "@/components/ui/StandingCard";
import { useEffect, useState } from "react";

interface IDriverStanding {
  id: string
  position: number;
  name: string;
  nationality: string;
  team: string;
  points: number;
}

export default function Home() {
  const [driverStanding, setDriverStanding] = useState<IDriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/driverStanding", {
          method: "GET",
          credentials: "include", // only if backend sends cookies
          headers: {
            "Content-Type": "application/json"
          }})
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        setDriverStanding(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-6">Error: {error}</div>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center font-geist p-4">
      <h1 className="my-8 md:my-16 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-sky-400">Standings</span> 2025</h1>
      <div className="w-[100%] md:w-[50%] flex flex-col gap-4">
        {driverStanding?.map((driver) => (
            <StandingCard key={driver.position} driver={driver} />
        ))}
      </div>
    </div>
  );
}
