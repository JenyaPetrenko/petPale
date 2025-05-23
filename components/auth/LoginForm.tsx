//components/auth/LoginForm.tsx - a form for login

"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

import Button from "../Button";
import { LoginForm as LoginFormType } from "@/utils/forms";

type LoginFormProps = {
  onSuccess: () => void; // Callback function triggered upon successful login
};

type RoleOption = {
  value: string; // Value of the checkbox option (e.g., "newsletter")
  label: string; // Label displayed next to the checkbox
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormType>({
    //store form data
    email: "",
    password: "",
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const options: RoleOption[] = [
    { value: "newsletter", label: "Subscribe to newsletter" },
    { value: "updates", label: "Get updates about events" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, //to update the corresponding field in the form data
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Login failed. Please check your email and password.");
    } else {
      onSuccess();
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[#426a5a] text-center">
        You need to be logged to get access to our services.
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
        required
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-700">
          Additional Options
        </h3>
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="options"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="w-4 h-4"
            />
            {option.label}
          </label>
        ))}
      </div>
      <Button>Log In</Button>
      <p className="text-center text-sm mt-4">
        Have no account?{" "}
        <a href="/products" className="text-[rgb(68,208,152)] hover:underline">
          Go to registration
        </a>
      </p>
    </form>
  );
}
