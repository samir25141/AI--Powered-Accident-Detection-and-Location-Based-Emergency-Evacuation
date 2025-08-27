"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { Button } from "../ui/button";
import UserNav from "../auth/UserNav";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenExists = document.cookie.includes("token=");
    setIsLoggedIn(tokenExists);
  }, []);

  return (
    <header
      style={{ backgroundColor: "rgba(30, 58, 138, 0.85)" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg border-b border-white/20"
    >
      <MaxWidthContainer>
        <nav className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-1 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
              EAIGLE
            </h2>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Button
                size="sm"
                className="bg-blue-700 hover:bg-[#3B82F6] text-white rounded-full px-4 py-2 shadow-md"
                asChild
              >
                <Link href="/auth/login">Login</Link>
              </Button>
            ) : (
              <UserNav />
            )}
          </div>
        </nav>
      </MaxWidthContainer>
    </header>
  );
}
