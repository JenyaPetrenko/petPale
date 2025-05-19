"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/img/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="hover:cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex space-x-6 text-sm font-medium text-[#333]">
          <Link
            href="/"
            className="hover:text-[#426a5a] transition hover:underline hover:decoration-[#ff8c00]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#426a5a] transition hover:underline hover:decoration-[#ff8c00]"
          >
            About Us
          </Link>
          <Link
            href="/products"
            className="hover:text-[#426a5a] transition hover:underline hover:decoration-[#ff8c00]"
          >
            Products
          </Link>
          <Link
            href="/reviews"
            className="hover:text-[#426a5a] transition hover:underline hover:decoration-[#ff8c00]"
          >
            Reviews
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-[#426a5a] transition hover:underline hover:decoration-[#ff8c00]"
          >
            Contact
          </Link>

          {session?.user && (
            <>
              <Link href="/profile" className="text-[#426a5a] hover:underline">
                My Page
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-600 hover:underline pointer-fine: cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
