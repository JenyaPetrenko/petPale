//app/joinForm/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import DynamicForm from "@/components/DynamicForm";

export default function JoinForm() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type") as "owner" | "caretaker";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center mt-10 mb-10">
        Join the App
      </h1>
      {formType ? (
        <DynamicForm formType={formType} />
      ) : (
        <p>Please select a valid form type.</p>
      )}
    </div>
  );
}
