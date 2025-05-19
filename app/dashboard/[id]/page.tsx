//app/dashboard/[id]/page.tsx

// app/dashboard/[id]/page.tsx - the page to view  any user profile
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PublicProfile from "@/components/Profile/PublicProfile"; // Змінив імпорт на правильний

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  image?: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const id = params?.id; // Отримуємо userId з параметрів
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/usersList/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => setUser(data.user))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!user) {
    return <p className="text-gray-500 text-center mt-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicProfile user={user} />
    </div>
  );
}
