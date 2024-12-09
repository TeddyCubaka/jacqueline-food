"use client";
import { useState } from "react";
import logo from "@/../public/Logo.jpg";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center overflow-hidden">
            <Image src={logo} alt="hello" width={70} height={70} />
            <span className="text-2xl font-bold text-green-600">
              Maison Jacqueline
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-600 hover:text-green-600 transition"
            >
              Accueil
            </a>
            <a
              href="#products"
              className="text-gray-600 hover:text-green-600 transition"
            >
              Nos Jus
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-green-600 transition"
            >
              À Propos
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-green-600 transition"
            >
              Contact
            </a>

            <a
              href="/dashboard"
              className="border-2 border-green-500 text-green-500 px-5 py-2.5 rounded-full hover:text-white hover:bg-green-500 transition hover:text-bold"
            >
              Connection
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className="block px-3 py-2 text-gray-600 hover:text-green-600"
            >
              Accueil
            </a>
            <a
              href="#products"
              className="block px-3 py-2 text-gray-600 hover:text-green-600"
            >
              Nos Jus
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-600 hover:text-green-600"
            >
              À Propos
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-600 hover:text-green-600"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
