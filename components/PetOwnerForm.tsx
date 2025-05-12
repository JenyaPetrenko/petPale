import React, { useReducer, useState } from "react";

import Button from "@/components/Button";

// Типи для стану форми
interface State {
  name: string;
  email: string;
  phone: string;
  petType: string;
  petName: string;
  petAge: number;
  petBreed: string;
  petGender: string;
  petImage: string;
  location: string;
  availability: string;
}

// Типи для дій у `useReducer`
type Action =
  | { type: "updateField"; field: keyof State; value: string | number }
  | { type: "reset" };

// Початковий стан форми
const initialState: State = {
  name: "",
  email: "",
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

// Редʼюсер для управління станом
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

  // Обробник змін у текстових полях
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

  // Обробник зміни файлу
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

  // Обробник надсилання форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Owner Form Data:", state);
    setSuccessMessage("You are registered as Pet Owner!"); // Показуємо повідомлення
    dispatch({ type: "reset" }); // Очищаємо форму
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

        {/* Повідомлення про успіх */}
        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}

        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="tel"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="text"
          name="petType"
          value={state.petType}
          onChange={handleChange}
          placeholder="Pet Type (e.g., Dog, Cat)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="text"
          name="petName"
          value={state.petName}
          onChange={handleChange}
          placeholder="Pet Name"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="number"
          name="petAge"
          value={state.petAge}
          onChange={handleChange}
          placeholder="Pet Age (years)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="text"
          name="petBreed"
          value={state.petBreed}
          onChange={handleChange}
          placeholder="Pet Breed"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <select
          name="petGender"
          value={state.petGender}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
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
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="text"
          name="location"
          value={state.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <textarea
          name="availability"
          value={state.availability}
          onChange={handleChange}
          placeholder="Availability (e.g., Weekends)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 h-24"
        />
        <Button>Join as Pet Owner</Button>
      </form>
    </div>
  );
};

export default PetOwnerForm;
