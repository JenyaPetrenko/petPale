"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Products() {
  const router = useRouter();

  const handleJoinClick = (type: "owner" | "caretaker") => {
    router.push(`/joinForm?type=${type}`); // Pass the type as a query parameter
  };

  return (
    <div id="produkterBODY">
      <header>
        <nav>
          <div id="navbar">
            <Image
              src="/assets/img/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            {/* Navbar logic */}
          </div>
          <div id="navbar-links" className="display">
            <Link id="link_home" href="/">
              Home
            </Link>
            <Link id="link_about" href="/about">
              About Us
            </Link>
            <Link id="link_product" href="/products">
              Products
            </Link>
            <Link id="link_review" href="/reviews">
              Reviews
            </Link>
            <Link id="link_kontakt" href="/kontakt">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section id="produkter">
          <Image
            src="/assets/img/explanation.png"
            alt="explanation of service"
            width={800}
            height={400}
          />
          <h1>Connect with hundreds of owners and caretakers.</h1>
          <div className="container">
            {/* Owner Card */}
            <div className="productCard">
              <Image
                src="/assets/img/Owner-A-(no-bg).png"
                alt="dog owner"
                className="productCard__img"
                width={300}
                height={300}
              />
              <h2>Owner</h2>
              <p className="productCard__info">
                Find a trusted person to care for your pet.
              </p>
              <Button
                onClick={() => handleJoinClick("owner")}
                className="productCard__btn"
              >
                Join
              </Button>
            </div>

            {/* Caretaker Card */}
            <div className="productCard">
              <Image
                src="/assets/img/Owner-B-(no-bg).png"
                alt="dog caretaker"
                className="productCard__img"
                width={300}
                height={300}
              />
              <h2>Caretaker</h2>
              <p className="productCard__info">
                Help others by spending time with pets.
              </p>
              <Button
                onClick={() => handleJoinClick("caretaker")}
                className="productCard__btn"
              >
                Join
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">{/* Footer content */}</footer>
    </div>
  );
}
