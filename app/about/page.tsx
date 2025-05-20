"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="omoss">
      <header></header>

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
    </div>
  );
}
