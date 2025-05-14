"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface State {
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  availability: string;
  image: string;
}

type Action =
  | { type: "updateField"; field: keyof State; value: string }
  | { type: "reset" };

const initialState: State = {
  name: "",
  email: "",
  password: "",
  phone: "",
  location: "",
  availability: "",
  image: "",
};

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const PetTakerForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "updateField",
      field: e.target.name as keyof State,
      value: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      dispatch({
        type: "updateField",
        field: "image",
        value: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password,
          role: "caretaker",
          location: state.location,
          availability: state.availability,
          phone: state.phone,
          image: state.image,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      setSuccessMessage("You are registered as Pet CareTaker!");

      // Optional: clear form after short delay
      setTimeout(() => dispatch({ type: "reset" }), 500);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Join as a Caretaker
        </h2>

        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}

        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={state.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="text"
          name="location"
          required
          placeholder="Location"
          value={state.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <textarea
          name="availability"
          placeholder="Availability (e.g., Weekends, Evenings)"
          value={state.availability}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm h-20"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />

        {!successMessage ? (
          <Button>Join as a Caretaker</Button>
        ) : (
          <Button onClick={() => router.push("/?login=true")}>
            Go to Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default PetTakerForm;
