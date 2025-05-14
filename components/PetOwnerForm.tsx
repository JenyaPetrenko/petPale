"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface State {
  name: string;
  email: string;
  password: string;
  phone: string;
  petType: string;
  petName: string;
  petAge: string | number;
  petBreed: string;
  petGender: string;
  petImage: string;
  location: string;
  availability: string;
}

type Action =
  | { type: "updateField"; field: keyof State; value: string | number }
  | { type: "reset" };

const initialState: State = {
  name: "",
  email: "",
  password: "",
  phone: "",
  petType: "",
  petName: "",
  petAge: 0,
  petBreed: "",
  petGender: "",
  petImage: "",
  location: "",
  availability: "",
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

const PetOwnerForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        field: "petImage",
        value: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
        role: "owner",
        location: state.location,
        phone: state.phone,
        petType: state.petType,
        petName: state.petName,
        petAge: state.petAge,
        petBreed: state.petBreed,
        petGender: state.petGender,
        petImage: state.petImage,
        availability: state.availability,
      }),
    });

    if (!res.ok) {
      console.error("Failed to register");
      setSuccessMessage("Something went wrong!");
      return;
    }

    setSuccessMessage("You are registered as Pet Owner!");
    setTimeout(() => dispatch({ type: "reset" }), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Join as Pet Owner
        </h2>

        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}

        <input
          type="text"
          name="name"
          required
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="email"
          name="email"
          required
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="password"
          name="password"
          required
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="tel"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="text"
          name="petType"
          required
          value={state.petType}
          onChange={handleChange}
          placeholder="Pet Type (e.g., Dog, Cat)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="text"
          name="petName"
          value={state.petName}
          onChange={handleChange}
          placeholder="Pet Name"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="number"
          name="petAge"
          value={state.petAge}
          onChange={handleChange}
          placeholder="Pet Age (years)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="text"
          name="petBreed"
          value={state.petBreed}
          onChange={handleChange}
          placeholder="Pet Breed"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <select
          name="petGender"
          value={state.petGender}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="file"
          name="petImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <input
          type="text"
          name="location"
          required
          value={state.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
        />
        <textarea
          name="availability"
          value={state.availability}
          onChange={handleChange}
          placeholder="Availability (e.g., Weekends)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm h-24"
        />

        {!successMessage ? (
          <Button>Join as Pet Owner</Button>
        ) : (
          <Button onClick={() => router.push("/?login=true")}>
            Go to Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default PetOwnerForm;
