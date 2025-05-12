import React, { useState } from "react";

import Button from "@/components/Button";

interface LoginFormProps {
  onSuccess: () => void;
}

const roles: { value: "owner" | "caretaker"; label: string }[] = [
  { value: "owner", label: "Owner" },
  { value: "caretaker", label: "Caretaker" },
];

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "caretaker" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role");
      return;
    }
    try {
      console.log("Logging in as:", { email, password, role });
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-700 text-center">
        Log In
      </h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
      />
      <div className="flex items-center gap-4">
        {roles.map((roleOption) => (
          <label key={roleOption.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value={roleOption.value}
              onChange={() => setRole(roleOption.value)}
              className="w-4 h-4"
            />
            {roleOption.label}
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
};

export default LoginForm;
