import React, { useReducer, useState } from "react";

import Button from "@/components/Button";

// Типи для стану форми
interface State {
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  image: string;
}

// Типи для дій у `useReducer`
type Action =
  | { type: "updateField"; field: keyof State; value: string }
  | { type: "reset" };

// Початковий стан форми
const initialState: State = {
  name: "",
  email: "",
  phone: "",
  location: "",
  availability: "",
  image: "",
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

const PetTakerForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Обробник змін у текстових полях
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        field: "image",
        value: URL.createObjectURL(file),
      });
    }
  };

  // Обробник надсилання форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Простий приклад валідації
    if (!state.name || !state.email || !state.phone) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Caretaker Form Data:", state);
    setSuccessMessage("You are registered now as Pet Caretaker!");
    dispatch({ type: "reset" }); // Очищення форми після успішного надсилання
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
        {successMessage && ( // Повідомлення про успіх
          <p className="text-green-500 text-center text-sm mt-2">
            {successMessage}
          </p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={state.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={state.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <textarea
          name="availability"
          placeholder="Availability (e.g., Weekends, Evenings)"
          value={state.availability}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 h-20"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <Button>Join as a Caretaker</Button>
      </form>
    </div>
  );
};

export default PetTakerForm;
