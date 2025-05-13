import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  //logout and my page links
  const { data: session } = useSession();

  return (
    <nav>
      <div id="navbar">
        <Image src="/assets/img/logo.png" alt="logo" width={40} height={40} />
        <div id="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/kontakt">Contact</Link>

          {/* logout and my page links for logged in users */}
          {session?.user && (
            <>
              <Link href="/profile" className="text-green-900">
                My Page
              </Link>
              <button onClick={() => signOut()} className="hover: underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
