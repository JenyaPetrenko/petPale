//components/PetTakerForm.tsx

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
  imageFile: File | null;
}

// Action types for the reducer
type Action =
  | { type: "updateField"; field: keyof State; value: string | File | null } // Action to update a specific field in the form state
  | { type: "reset" }; // Action to reset the form to its initial state

// Initial state for the form
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

// Reducer function to manage form state updates
function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateField":
      // Update a specific field in the form state
      return { ...state, [action.field]: action.value };
    case "reset":
      // Reset the form state to the initial state
      return initialState;
    default:
      return state; // Return the current state if no matching action is found
  }
}

//// **Functional Component** ////

// Main form component for registering as a caretaker
const PetTakerForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState); // Manage form state using a reducer
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for handling success or error messages
  const router = useRouter(); // Next.js router instance for navigation

  //// **Event Handlers** ////

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "updateField", // Dispatch an action to update a field
      field: e.target.name as keyof State, // Identify the field by its name attribute
      value: e.target.value, // Use the input's value as the new field value
    });
  };

  // Handle file input changes (for profile picture)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      dispatch({ type: "updateField", field: "imageFile", value: file }); // Store the file in the state
      dispatch({
        type: "updateField",
        field: "image",
        value: URL.createObjectURL(file), // Create a preview URL for the image
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("role", "caretaker"); // Hardcoded role as "caretaker"
    formData.append("location", state.location);
    formData.append("availability", state.availability);
    formData.append("phone", state.phone);
    if (state.imageFile) {
      formData.append("image", state.imageFile); // Include the uploaded image file
    }

    try {
      // Send a POST request to register the caretaker
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData, // Send form data as the request body
      });

      const data = await res.json(); // Parse the server's response

      if (!res.ok) {
        console.error("❌Register error:", data.message, data.error); // Log errors if the response is not OK
        setSuccessMessage(data.message || "Error occurred"); // Display an error message
        return;
      }

      // Success: Display a success message and reset the form
      setSuccessMessage("You are registered as Pet CareTaker!");
      setTimeout(() => dispatch({ type: "reset" }), 500); // Reset the form after a short delay
    } catch (err) {
      console.error("❌ Unexpected error:", err); // Log unexpected errors
      setSuccessMessage("Something went wrong!"); // Display a generic error message
    }
  };

  //// **Rendering** ////
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
