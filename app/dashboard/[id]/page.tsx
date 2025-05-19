//app/dashboard/[id]/page.tsx

// app/dashboard/[id]/page.tsx - the page to view  any user profile
"use client";

import { useParams } from "next/navigation";
import PublicProfile from "@/components/Profile/PublicProfile"; // Змінив імпорт на правильний
import Navbar from "@/components/Navbar"; // Імпорт Navbar
import Footer from "@/components/Footer"; // Імпорт Footer

export default function UserProfilePage() {
  const params = useParams();
  const id = params?.id;

  if (!id || Array.isArray(id)) {
    return <p className="text-red-500">Invalid user ID</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          <PublicProfile userId={id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
