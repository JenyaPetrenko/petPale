"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="omoss">
      <header>
        <nav>
          <div id="navbar">
            <Image
              src="/assets/img/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <svg
              id="hamburger"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-align-justify"
            >
              <line x1="21" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="21" y1="18" x2="3" y2="18"></line>
            </svg>
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
        <div className="container">
          <Image
            src="/assets/img/hero-1.jpg"
            alt="hero"
            className="hero"
            width={800}
            height={400}
          />
          <h2>For Animals, For Smiles</h2>
          <p>
            We dedicate to offering a safe and trustworthy community for pet
            enthusiasts, supporting new adventures for pets. <br />
            Petpal is the gateway to a world of shared pet love and connections.
            Whether you are a pet owner looking to find a temporary home or
            someone eager to embrace the joys of pet companionship, Petpals
            brings you together.
          </p>
        </div>

        <div className="timeline">
          <h2>History</h2>
          <ul className="timeline-list">
            {[
              {
                date: "Feb 2010",
                content:
                  "Established by Lisa Johnson. Her love for her pet and the challenges of balancing care with work travel inspired her.",
              },
              {
                date: "Jan 2012",
                content:
                  "Petpals introduced a strict policy focused on pet safety and well-being, ensuring seamless transactions between trustworthy caregivers and pet owners.",
              },
              {
                date: "Dec 2018",
                content:
                  "Petpals expanded its user base and grew into a platform supported by a diverse community of dog lovers, cat enthusiasts, bird aficionados, and various pet enthusiasts.",
              },
              {
                date: "2023",
                content:
                  "Petpals continues to grow, setting new standards for pet sharing and providing users with new friends and wonderful pet experiences.",
              },
            ].map((item, index) => (
              <li key={index} className="timeline-list-item">
                <div className="date">{item.date}</div>
                <div className="content">{item.content}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="container">
          <h2>Members</h2>

          <div className="members">
            {[
              {
                name: "Lisa",
                title: "CEO / Founder",
                email: "lisa@petpals.com",
                description:
                  "Founder of PetShare and a passionate dog lover. Our mission is to connect pet enthusiasts and nurture new friendships. Mother of 2 dogs and 1 cat.",
                img: "/assets/img/portrait-1.jpg",
              },
              {
                name: "Jonas",
                title: "COO",
                email: "jonas@pethem.com",
                description:
                  "Working tirelessly to smoothly operate the pet-sharing service and provide users with reliability and safety. Love birds.",
                img: "/assets/img/portrait-2.jpg",
              },
              {
                name: "Jenia",
                title: "Marketer",
                email: "jenia@petpals.com",
                description:
                  "Driven to strengthen connections among pet enthusiasts and spread the message of Petpals.",
                img: "/assets/img/portrait-3.jpg",
              },
              {
                name: "Yukako",
                title: "Customer Support",
                email: "yukako@petpals.com",
                description:
                  "As a Customer Support Specialist and Coordinator, I ensure that pet owners and caregivers have a comfortable service experience.",
                img: "/assets/img/portrait-4.jpg",
              },
              {
                name: "John",
                title: "Coodinator",
                email: "john@petpals.com",
                description:
                  "As a Pet Wellbeing Specialist and Coordinator, I focus on the happiness and safety of pets, providing support and advice to both pet owners and caregivers.",
                img: "/assets/img/portrait-6.jpg",
              },
              {
                name: "Sofia",
                title: "Pet Wellbeing Specialist",
                email: "sofia@petpals.com",
                description:
                  "Focusing on the happiness and safety of pets, providing support and advice to both pet owners and caregivers.",
                img: "/assets/img/portrait-5.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="member">
                <Image
                  src={member.img}
                  alt={member.name}
                  className="portrait"
                  width={150}
                  height={150}
                />
                <h3>{member.name}</h3>
                <div>
                  <div className="TitleEmail">
                    <p>{member.title}</p>
                    <p>{member.email}</p>
                  </div>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
            <Image
              src="/assets/img/logo.png"
              alt="Logo"
              width={30}
              height={30}
            />
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
