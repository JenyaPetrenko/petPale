"use client";

import { useSearchParams } from "next/navigation";
import PetOwnerForm from "@/components/PetOwnerForm";
import PetTakerForm from "@/components/PetTakerForm";

export default function JoinForm() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type"); // Get the "type" parameter from the URL

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center mt-10 mb-10">
        Join the App
      </h1>

      {/* Automatically render the correct form based on the "type" parameter */}
      <div>
        {formType === "owner" && <PetOwnerForm />}
        {formType === "caretaker" && <PetTakerForm />}
        {!formType && <p>Please select a valid form type.</p>}
      </div>
    </div>
  );
}
