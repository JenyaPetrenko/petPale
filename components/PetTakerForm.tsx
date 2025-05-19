//components/PetTakerForm.tsx

"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

// Типи для стану форми
interface State {
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  availability: string;
  image: string;
  imageFile: File | null;
}

// Дії редʼюсера
type Action =
  | { type: "updateField"; field: keyof State; value: string | File | null }
  | { type: "reset" };

// Початковий стан
const initialState: State = {
  name: "",
  email: "",
  password: "",
  phone: "",
  location: "",
  availability: "",
  image: "",
  imageFile: null,
};

// Редʼюсер
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
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      dispatch({ type: "updateField", field: "imageFile", value: file });
      dispatch({
        type: "updateField",
        field: "image",
        value: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("role", "caretaker");
    formData.append("location", state.location);
    formData.append("availability", state.availability);
    formData.append("phone", state.phone);
    if (state.imageFile) {
      formData.append("image", state.imageFile);
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // Отримаємо і message, і error

      if (!res.ok) {
        console.error("❌ Register error:", data.message, data.error); // ВИВОДИМО ВСЕ
        setSuccessMessage(data.message || "Error occurred");
        return;
      }

      setSuccessMessage("You are registered as Pet CareTaker!");
      setTimeout(() => dispatch({ type: "reset" }), 500);
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      setSuccessMessage("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
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

        <div>
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload your image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md text-sm"
          />
        </div>

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
