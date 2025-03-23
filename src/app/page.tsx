import Image from "next/image";

export default async function Home() {

  const res = await fetch("http://localhost:3000/api/scrape", { cache: "no-store" });
  const { result } = await res.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{result}</h1>
    </div>
  );
}
