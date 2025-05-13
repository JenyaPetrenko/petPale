"use client";

import React, { useState } from "react";

import { useSession } from "next-auth/react";

import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import LoginForm from "@/components/auth/LoginForm";
import Button from "@/components/Button";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Providers>
      <div className="index">
        <header>
          <Navbar />
        </header>
        <div className="wrapper">
          <main className="text-center space-y-4 mt-10">
            {/* 👋 2. Блок вітання */}
            {session?.user && (
              <h2 className="text-2xl font-semibold text-green-600">
                👋 Welcome, {session.user.name || session.user.email}!
              </h2>
            )}

            <h2 className="text-2xl font-bold">For Animals. For Smiles.</h2>
            <p>
              Petpal connects pet owners seeking temporary homes with those
              eager to embrace pet companionship.
            </p>
            <Button className="CTA" onClick={() => setIsLoginOpen(true)}>
              To the Service
            </Button>
          </main>
        </div>
        <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
          <LoginForm onSuccess={() => setIsLoginOpen(false)} />
        </Modal>
        <Footer />
      </div>
    </Providers>
  );
}
