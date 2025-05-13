"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <div className="kontakt">
      <header>
        <Navbar></Navbar>
      </header>

      <div className="wrapper">
        <div className="images">
          <div className="display-none-mobile">
            <Image
              src="/public/assets/img/office2.png"
              alt="office"
              width={600}
              height={400}
            />
          </div>
          <div className="display-none-desktop">
            <Image
              src="/img/office.png"
              alt="office"
              width={600}
              height={400}
            />
          </div>
        </div>

        <div className="form">
          <h1 className="title" style={{ fontSize: "2rem" }}>
            Contact us
          </h1>

          <div className="contacts">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="number">Phone number</label>
            <input type="number" name="number" id="number" />
          </div>

          <div className="account-type">
            <p>Account Type</p>
            <div className="radio-options">
              <label htmlFor="owner">
                <input id="owner" type="radio" name="account-type" />
                Pet Owner
              </label>
              <label htmlFor="renter">
                <input id="renter" type="radio" name="account-type" />
                Caretaker
              </label>
            </div>
          </div>

          <div className="topic">
            <p>Topic of your mail</p>
            <select name="topic">
              <option value="">(select one)</option>
              <option value="1">Pet Owner Registration</option>
              <option value="2">Pet Availability</option>
              <option value="3">Feedback and Suggestions</option>
              <option value="4">Other</option>
            </select>
          </div>

          <textarea
            id="bio"
            name="message"
            rows={5}
            placeholder="Write the text..."
          ></textarea>
          <button>Submit</button>
        </div>
      </div>

      <footer className="footer">
        <div className="address">
          <div className="address-item">
            <Image
              src="/img/icon_addres.png"
              alt="Address Icon"
              width={20}
              height={20}
            />
            <span>Sveavägen, 11</span>
          </div>
          <div className="address-item">
            <Image
              src="/img/icone_phone.png"
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
            <Image src="/img/logo.png" alt="Logo" width={50} height={50} />
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/kontakt">Contact</Link>
          </div>

          <div className="CopyAndSocial">
            <p>©Petpals</p>
            <div className="footer-social">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
