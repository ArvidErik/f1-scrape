"use client";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
    <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-geist">
      <h1 className="text-3xl font-bold mb-6">F1 Driver Standings 2025</h1>
      <Table className="w-full max-w-4xl border border-gray-200 rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-16 text-center">Pos</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {driverStanding.map((driver) => (
            <TableRow key={driver.position}>
              <TableCell className="text-center">{driver.position}</TableCell>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.nationality}</TableCell>
              <TableCell>{driver.team}</TableCell>
              <TableCell className="text-right font-bold">{driver.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
