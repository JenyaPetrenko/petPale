"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Reviews() {
  // Статичні дані для відображення
  const reviews = [
    {
      id: 1,
      name: "Jane",
      image: "/img/Reviewers/person1.jpg",
      comment:
        "Through Pet pals I managed to find a great caretaker for my cat Simba for the weekend.",
      stars: 5,
    },
    {
      id: 2,
      name: "Sven",
      image: "/public/assets/img/Reviewers/person2.jpg",
      comment:
        "I was going out of town for a week. And thanks to Petpals, I managed to find the perfect caretaker for Fred.",
      stars: 5,
    },
    {
      id: 3,
      name: "Harold",
      image: "/img/Reviewers/person4.jpg",
      comment:
        "I needed a pet in my life. And by using Petpals, I managed to find a new friend in a dog named Arthur.",
      stars: 5,
    },
  ];

  return (
    <div id="referenserBODY">
      <header>
        <Navbar></Navbar>
      </header>

      <main>
        <section id="referenser">
          <h1>Voice of our customers</h1>
          <div id="reviewCards">
            {reviews.map((review) => (
              <article key={review.id} className="reviewCard">
                <Image
                  src={review.image}
                  alt={`thumbnail of ${review.name}`}
                  width={150}
                  height={150}
                />
                <h2>{review.name}</h2>
                <div className="container">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                  <p className="reviewCard__comment">{review.comment}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

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
          <p>©Petpals</p>
        </div>
      </footer>
    </div>
  );
}
