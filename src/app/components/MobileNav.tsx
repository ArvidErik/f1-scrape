"use client";

import Link from "next/link";
import { Menu, X, Home, BarChart3 } from "lucide-react";

export default function MobileNav() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-red-700 text-white p-4 flex justify-around md:hidden">
          <Link href="/">
            <div className="flex flex-col items-center">
              <Home size={24} />
              <span className="text-sm">Standings</span>
            </div>
          </Link>
          <Link href="/standings">
            <div className="flex flex-col items-center">
              <BarChart3 size={24} />
              <span className="text-sm">Analytics</span>
            </div>
          </Link>
        </div>
    );
}
