"use client";

import Link from "next/link";

export default function Sidebar() {

  return (
    <nav className="w-full bg-red-700 text-white p-4 flex justify-between items-center md:w-full">
      <h2 className="text-xl font-semibold">Formula Check</h2>
      <ul className="hidden md:flex space-x-4">
        <li>
          <Link href="/">
            <span className="hover:text-gray-400 cursor-pointer">Standings</span>
          </Link>
        </li>
        <li>
        <Link href="/analytics">
            <span className="hover:text-gray-400 cursor-pointer">Analytics</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
