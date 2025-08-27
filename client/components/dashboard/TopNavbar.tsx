"use client";

import useSidebar from "@/contexts/useSidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/clsxTwMerge";
import { useState } from "react";

export default function TopNavbar() {
  const { setShowSidebar } = useSidebar();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="bg-white py-4 border-b-2 mt-16 w-full">
      <MaxWidthContainer className="max-w-none md:px-5">
        <nav className="flex flex-row items-center justify-between ">
          {/* Left Side */}
          <div className="flex items-center space-x-6">
            {/* Burger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="block md:hidden"
            >
              <Menu />
            </button>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-gray-800 hover:text-blue-600 transition",
                    pathname === "/dashboard" &&
                      "font-semibold underline underline-offset-4 text-blue-600"
                  )}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/all-datas"
                  className={cn(
                    "text-gray-800 hover:text-blue-600 transition",
                    pathname === "/dashboard/all-datas" &&
                      "font-semibold underline underline-offset-4 text-blue-600"
                  )}
                >
                  All Datas
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side (intentionally left empty) */}
          <div />
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-100 border-t z-50 shadow-md">
            <ul className="flex flex-col px-4 py-3 space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className={cn(
                    "block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition",
                    pathname === "/dashboard" && "bg-gray-200 font-medium"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/all-datas"
                  className={cn(
                    "block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded transition",
                    pathname === "/dashboard/all-datas" && "bg-gray-200 font-medium"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Datas
                </Link>
              </li>
            </ul>
          </div>
        )}
      </MaxWidthContainer>
    </main>
  );
}
