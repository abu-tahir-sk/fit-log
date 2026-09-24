"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
      {
            name: "Workouts",
            href: "/workouts",
      },
      {
            name: "My Plan",
            href: "/my-plan",
      },
];

export default function Navbar() {
      const pathname = usePathname();

      return (
            <nav className="h-16 w-full border-b border-[#1d1e22] bg-[#0d0e10]">
                  <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5">

                        {/* Logo */}
                        <Link
                              href="/"
                              className="flex items-center gap-2 text-white"
                        >
                              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#2a2d31] bg-[#121417]">
                                    <Image
                                          src="/logo.png"
                                          alt="Fitlog logo"
                                          fill
                                          sizes="32px"
                                          className="object-cover"
                                    />
                              </div>

                              <span className="text-[15px] font-extrabold tracking-wide">
                                    FITLOG
                              </span>
                        </Link>

                        {/* Navigation */}
                        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
                              {navLinks.map((link) => {
                                    const isActive = pathname === link.href;

                                    return (
                                          <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`rounded-full px-4 py-1.5 text-[11px] transition-all duration-200 ${isActive
                                                            ? "bg-[#18220b] font-semibold text-[#ccff00]"
                                                            : "text-[#85878c] hover:text-white"
                                                      }`}
                                          >
                                                {link.name}
                                          </Link>
                                    );
                              })}
                        </div>

                        {/* Right Status */}
                        <div className="flex items-center gap-5 text-[11px]">

                              {/* Plan */}
                              <div className="flex items-center gap-2 text-[#d5d5d8]">
                                    <span>Plan</span>

                                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[9px] font-bold text-black">
                                          0
                                    </span>
                              </div>

                              {/* Saved */}
                              <div className="flex items-center gap-2 text-[#d5d5d8]">
                                    <span>Saved</span>

                                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-[#303238] px-1 text-[9px] text-[#85878c]">
                                          0
                                    </span>
                              </div>

                        </div>
                  </div>
            </nav>
      );
}