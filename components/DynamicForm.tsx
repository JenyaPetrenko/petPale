import React, { useReducer, useState } from "react";
import Button from "@/components/Button";

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "file" | "select";
  options?: string[];
  placeholder?: string;
}

interface FormConfig {
  title: string;
  fields: FormField[];
}

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
        options: ["Male", "Female"],
      },
      { label: "Pet Image", name: "petImage", type: "file" },
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

type State = Record<string, string | number | File | null>;

type Action =
  | { type: "updateField"; field: string; value: string | number | File }
  | { type: "reset" };

const DynamicForm: React.FC<{ formType: "owner" | "caretaker" }> = ({
  formType,
}) => {
  const formConfig = formConfigs[formType];
  const initialState = formConfig.fields.reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? null : "";
    return acc;
  }, {} as State);

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "updateField":
          return { ...state, [action.field]: action.value };
        case "reset":
          return initialState;
        default:
          return state;
      }
    },
    initialState
  );

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "updateField", field: name, value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({
        type: "updateField",
        field: e.target.name,
        value: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${formConfig.title} Data:`, state);
    setSuccessMessage(
      `You are registered as ${formConfig.title.split(" ")[2]}!`
    );
    dispatch({ type: "reset" });
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
