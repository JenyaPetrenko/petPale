import React, { useState } from "react";
import PetOwnerForm from "@/components/PetOwnerForm";
import PetTakerForm from "@/components/PetTakerForm";

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [role, setRole] = useState<"owner" | "taker" | null>(null);

  if (role === "owner") {
    return <PetOwnerForm />;
  }

  if (role === "taker") {
    return <PetTakerForm />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-700 text-center">
        Register
      </h2>
      <p className="text-center text-sm">
        Please select your role to continue registration:
      </p>
      <button
        onClick={() => setRole("owner")}
        className="bg-[rgb(66,106,90)] text-white py-2 rounded-md"
      >
        Register as Pet Owner
      </button>
      <button
        onClick={() => setRole("taker")}
        className="bg-green-500 text-white py-2 rounded-md"
      >
        Register as Pet Taker
      </button>
      <button
        onClick={onSuccess}
        className="text-gray-500 text-sm underline mt-4"
      >
        Back to Login
      </button>
    </div>
  );
};

export default RegisterForm;
