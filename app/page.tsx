"use client";

import React, { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="index">
      <header>
        <Navbar />
      </header>
      <div className="wrapper">
        <main>
          <h2>For Animals. For Smiles.</h2>
          <p>
            Petpal connects pet owners seeking temporary homes with those eager
            to embrace pet companionship.
          </p>
          <button
            className="CTA"
            onClick={() => setIsLoginOpen(true)} // Відкриваємо модальне вікно
          >
            To the Service
          </button>
        </main>
      </div>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm onSuccess={() => setIsLoginOpen(false)} />
      </Modal>
      <Footer />
    </div>
  );
}
