"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen z-10">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col md:w-64`}
      >
        <button
          className="md:hidden mb-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        <ul>
          <li className="mb-2">
            <Link href="/">
              <span className="hover:text-gray-400 cursor-pointer">Home</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/about">
              <span className="hover:text-gray-400 cursor-pointer">About</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/contact">
              <span className="hover:text-gray-400 cursor-pointer">Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 m-2 text-gray-900"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>
    </div>
  );
}
