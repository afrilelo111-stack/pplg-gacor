"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

        <h1 className="text-2xl font-black text-blue">
          PPLG<small className="text-blue-600">Twogether</small>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#Projects" className="hover:text-blue-600 transition">
              Projects
            </a>
          </li>

          <li>
            <a href="#Roadmap" className="hover:text-blue-600 transition">
              Roadmap
            </a>
          </li>

          <li>
            <a href="#About" className="hover:text-blue-600 transition">
              About
            </a>
          </li>
        </ul>

        {/* Desktop Button */}
        {/* <a
          href="#contact"
          className="hidden md:block bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl font-semibold"
        >
          Contact
        </a> */}

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-5 space-y-4">

          <a
            href="#"
            className="block hover:text-blue-600"
          >
            Home
          </a>

          <a
            href="#Projects"
            className="block hover:text-blue-600"
          >
            Projects
          </a>

          <a
            href="#Roadmap"
            className="block hover:text-blue-600"
          >
            Roadmap
          </a>

          <a
            href="#About"
            className="block hover:text-blue-600"
          >
            About
          </a>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="block bg-blue-600 text-white text-center py-3 rounded-xl"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}