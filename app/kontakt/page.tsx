"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

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
              src="/assets/img/office2.png"
              alt="office"
              width={600}
              height={400}
            />
          </div>
          <div className="display-none-desktop">
            <Image
              src="/assets/img/office.png"
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

      <Footer></Footer>
    </div>
  );
}
