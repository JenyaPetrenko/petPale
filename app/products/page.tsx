"use client";

import Image from "next/image";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import PetOwnerForm from "@/components/PetOwnerForm";
import PetTakerForm from "@/components/PetTakerForm";
import Button from "@/components/Button";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"owner" | "caretaker" | null>(
    null
  );

  const handleOpenModal = (type: "owner" | "caretaker") => {
    setActiveForm(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveForm(null);
    setIsModalOpen(false);
  };

  return (
    <div id="produkterBODY">
      <header>
        <Navbar></Navbar>
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
                onClick={() => handleOpenModal("owner")}
                className="productCard__btn"
              >
                Join as Pet Owner
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
                onClick={() => handleOpenModal("caretaker")}
                className="productCard__btn"
              >
                Join as Pet Caretaker
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for forms */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {activeForm === "owner" && <PetOwnerForm />}
        {activeForm === "caretaker" && <PetTakerForm />}
      </Modal>
    </div>
  );
}
