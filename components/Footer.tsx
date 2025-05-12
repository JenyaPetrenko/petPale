import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="address">
        <div className="address-item">
          <Image
            src="/assets/img/icon_addres.png"
            alt="Address Icon"
            width={20}
            height={20}
          />
          <span>Sveavägen, 11</span>
        </div>
        <div className="address-item">
          <Image
            src="/assets/img/icone_phone.png"
            alt="Phone Icon"
            width={20}
            height={20}
          />
          <span>(000) 000 00 00</span>
        </div>
      </div>
      <hr className="line" />

      <div className="footer-container">
        <div className="footer-links">
          <Image src="/assets/img/logo.png" alt="Logo" width={30} height={30} />
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/kontakt">Contact</Link>
        </div>

        <div className="CopyAndSocial">
          <p>©Petpals</p>
          <div className="footer-social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
