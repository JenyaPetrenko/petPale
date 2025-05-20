//app/joinForm/page.tsx - renders a form based on query parameter: owner or caretaker

"use client"; // Enables client-side rendering for this page

import { useSearchParams } from "next/navigation"; // Hook to access query parameters in the URL
import DynamicForm from "@/components/DynamicForm"; // A reusable component for rendering dynamic forms based on the type

// Main component for the Join Form page
export default function JoinForm() {
  // Access search parameters from the URL
  const searchParams = useSearchParams();
  // Extract the 'type' parameter and cast it as either 'owner' or 'caretaker'
  const formType = searchParams.get("type") as "owner" | "caretaker";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-center mt-10 mb-10">
        Join the App
      </h1>
      {/* Render the dynamic form if 'formType' is valid */}
      {formType ? (
        <DynamicForm formType={formType} />
      ) : (
        // Show an error message if 'formType' is invalid or missing
        <p>Please select a valid form type.</p>
      )}
    </div>
  );
}
