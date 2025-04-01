"use client";
import StandingCard from "@/components/ui/StandingCard";
import { useEffect, useState } from "react";

interface IDriverStanding {
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
        const res = await fetch("http://localhost:3000/api/driverStanding");
        if (!res.ok) throw new Error("Failed to fetch data");

        const { result } = await res.json();
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
      <h1 className="text-3xl font-bold mb-6 text-center">F1 Driver Standings 2025</h1>
      <div className="w-[75%]">
        {driverStanding.map((driver) => (
            <StandingCard key={driver.position} driver={driver} />
        ))}
      </div>
    </div>
  );
}
