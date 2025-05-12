import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
