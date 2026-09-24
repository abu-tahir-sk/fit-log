"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useContext } from "react";
import { PlanContext } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { plan, saved } = useContext(PlanContext);

  return (
    <nav className="relative h-[74px] w-full border-b border-[#1d1e22] bg-[#0d0e10]">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={91}
            height={32}
            className="h-8 w-[91px] object-contain"
            priority
          />
          <span className="text-[13px] font-bold tracking-[0.14em] text-white sm:text-[15px]">
            FITLOG
          </span>
        </Link>
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[15px] font-medium transition ${
              pathname === "/"
                ? "bg-[#17240b] text-[#c8ff00]"
                : "text-[#9a9ca3] hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-[15px] font-medium transition ${
              pathname === "/my-plan"
                ? "bg-[#17240b] text-[#c8ff00]"
                : "text-[#9a9ca3] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
        
        {/* Updated: This entire div is now a Link to /my-plan */}
        <Link href="/my-plan" className="ml-auto flex items-center gap-3 sm:gap-6 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[13px] text-[#a5a6ad] sm:text-[15px]">
              Plan
            </span>
            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#c8ff00] px-1 text-[11px] font-semibold text-[#0d0e10]">
              {plan.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[13px] text-[#a5a6ad] sm:text-[15px]">
              Saved
            </span>
            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full border border-[#303239] px-1 text-[11px] text-[#a5a6ad]">
              {saved.length}
            </span>
          </div>
        </Link>
        
        <div className="ml-3 flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#303239] text-[#c8ff00]"
            aria-label="Toggle menu"
          >
            <span className="text-xl leading-none">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="absolute left-0 top-[74px] z-50 w-full border-b border-[#24272d] bg-[#0d0e10] px-4 py-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-[15px] font-medium ${
                pathname === "/"
                  ? "bg-[#17240b] text-[#c8ff00]"
                  : "text-[#9a9ca3] hover:bg-[#15171c] hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-[15px] font-medium ${
                pathname === "/my-plan"
                  ? "bg-[#17240b] text-[#c8ff00]"
                  : "text-[#9a9ca3] hover:bg-[#15171c] hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}