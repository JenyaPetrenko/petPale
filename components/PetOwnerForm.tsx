//components/PetOwnerForm.tsx - registering for pet owners

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
  location: string;
  availability: string;
  imageFile: File | null;
}

//action type for the form reducer
type Action =
  | {
      type: "updateField";
      field: keyof State;
      value: string | number | File | null;
    }
  | { type: "reset" };

const initialState: State = {
  name: "",
  email: "",
  password: "",
  phone: "",
  petType: "",
  petName: "",
  petAge: "",
  petBreed: "",
  petGender: "",
  location: "",
  availability: "",
  imageFile: null,
};

//reducer function to handle form state updates
// Reducer function to manage form state updates
function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value }; // Update the specified field.
    case "reset":
      return initialState; // Reset the form to its initial state.
    default:
      return state; // Return the current state if no matching action is found.
  }
}

//// **Functional Component** ////

// Main form component
const PetOwnerForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState); // State management using useReducer.
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for handling success or error messages.
  const router = useRouter(); // Next.js router instance for navigation.

  //// **Event Handlers** ////

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    dispatch({
      type: "updateField", // Dispatch an action to update the field.
      field: e.target.name as keyof State, // Update the field by its name.
      value: e.target.value, // Set the new value.
    });
  };

  // Handle file input changes (for profile picture)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      dispatch({
        type: "updateField", // Dispatch an action to update the file field.
        field: "imageFile",
        value: e.target.files[0], // Set the selected file.
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Validate the password length
    if (state.password.length < 6) {
      setSuccessMessage("Password must be at least 6 characters"); // Error message for invalid password.
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("role", "owner"); // Hardcoded role as "owner".
    formData.append("location", state.location);
    formData.append("phone", state.phone);
    formData.append("petType", state.petType);
    formData.append("petName", state.petName);
    formData.append("petAge", String(state.petAge)); // Convert petAge to string.
    formData.append("petBreed", state.petBreed);
    formData.append("petGender", state.petGender);
    formData.append("availability", state.availability);
    if (state.imageFile) {
      formData.append("image", state.imageFile); // Include the profile picture if provided.
    }

    try {
      // Send a POST request to the server
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // Parse the response JSON.

      if (!res.ok) {
        console.error(" Register error:", data.message); // Log the error.
        setSuccessMessage(data.message || "Registration failed."); // Display the error message.
        return;
      }

      // Success: Show success message and reset the form
      setSuccessMessage("You are registered as Pet Owner!");
      setTimeout(() => {
        dispatch({ type: "reset" }); // Reset the form after successful submission.
      }, 1000);
    } catch (error) {
      console.error(error); // Log any errors during the fetch.
      setSuccessMessage("Something went wrong!"); // Display a generic error message.
    }
  };

  //// **Rendering** ////

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

        <input
          type="text"
          name="location"
          required
          value={state.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
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
