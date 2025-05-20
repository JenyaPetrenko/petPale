//components/DynamicForm.tsx

// Importing required React hooks and components
import React, { useReducer, useState } from "react";
import Button from "@/components/Button";

// Define the structure of each form field
interface FormField {
  label: string; // Display label for the field
  name: string; // Unique name for the field
  type: "text" | "email" | "tel" | "number" | "textarea" | "file" | "select"; // Input type
  options?: string[]; // Options for 'select' input type (if applicable)
  placeholder?: string; // Placeholder text for the input
}

// Define the structure of the form configuration
interface FormConfig {
  title: string; // Title of the form
  fields: FormField[]; // Array of fields in the form
}

// Configuration for dynamic forms based on the type ('owner' or 'caretaker')
const formConfigs: Record<string, FormConfig> = {
  owner: {
    title: "Join as Pet Owner",
    fields: [
      { label: "Name", name: "name", type: "text", placeholder: "Name" },
      { label: "Email", name: "email", type: "email", placeholder: "Email" },
      { label: "Phone", name: "phone", type: "tel", placeholder: "Phone" },
      {
        label: "Pet Type",
        name: "petType",
        type: "text",
        placeholder: "Pet Type (e.g., Dog, Cat)",
      },
      {
        label: "Pet Name",
        name: "petName",
        type: "text",
        placeholder: "Pet Name",
      },
      {
        label: "Pet Age",
        name: "petAge",
        type: "number",
        placeholder: "Pet Age (years)",
      },
      {
        label: "Pet Breed",
        name: "petBreed",
        type: "text",
        placeholder: "Pet Breed",
      },
      {
        label: "Pet Gender",
        name: "petGender",
        type: "select",
        options: ["Male", "Female"], // Dropdown options
      },
      { label: "Pet Image", name: "image", type: "file" },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Location",
      },
      {
        label: "Availability",
        name: "availability",
        type: "textarea",
        placeholder: "Availability (e.g., Weekends)",
      },
    ],
  },
  caretaker: {
    title: "Join as a Caretaker",
    fields: [
      { label: "Name", name: "name", type: "text", placeholder: "Name" },
      { label: "Email", name: "email", type: "email", placeholder: "Email" },
      { label: "Phone", name: "phone", type: "tel", placeholder: "Phone" },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Location",
      },
      {
        label: "Availability",
        name: "availability",
        type: "textarea",
        placeholder: "Availability (e.g., Weekends, Evenings)",
      },
      { label: "Image", name: "image", type: "file" },
    ],
  },
};

// Define the state and actions for the `useReducer` hook
type State = Record<string, string | number | File | null>;

type Action =
  | { type: "updateField"; field: string; value: string | number | File } // Update a specific field
  | { type: "reset" }; // Reset the form state

// Main DynamicForm component
const DynamicForm: React.FC<{ formType: "owner" | "caretaker" }> = ({
  formType,
}) => {
  const formConfig = formConfigs[formType]; // Get the form configuration for the given form type

  // Initialize form state based on the fields in the configuration
  const initialState = formConfig.fields.reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? null : ""; // File inputs start with null, others with empty strings
    return acc;
  }, {} as State);

  // Reducer function to manage form state
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "updateField":
          return { ...state, [action.field]: action.value }; // Update the specific field
        case "reset":
          return initialState; // Reset the form state
        default:
          return state;
      }
    },
    initialState
  );

  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Manage success message

  // Handle changes for text, email, number, textarea, and select inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "updateField", field: name, value });
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({
        type: "updateField",
        field: e.target.name,
        value: e.target.files[0], // Store the file object
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = formConfig.fields.filter((field) =>
      ["name", "email", "password", "location"].includes(field.name)
    );

    for (const field of requiredFields) {
      if (!state[field.name]) {
        alert(`Field ${field.label} is required`); // Alert for missing required fields
        return;
      }
    }

    console.log(`${formConfig.title} Data:`, state); // Log the form data
    setSuccessMessage(
      `You are registered as ${formConfig.title.split(" ")[2]}!` // Display success message
    );
    dispatch({ type: "reset" }); // Reset the form
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {formConfig.title}
        </h2>
        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}
        {formConfig.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={state[field.name] as string}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 h-24"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={state[field.name] as string}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={
                  field.type === "file"
                    ? undefined
                    : (state[field.name] as string | number)
                }
                onChange={
                  field.type === "file" ? handleFileChange : handleChange
                }
                placeholder={field.placeholder}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            )}
          </div>
        ))}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default DynamicForm;
