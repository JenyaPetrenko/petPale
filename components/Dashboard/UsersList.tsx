//components/Dashboard/UsersList.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Для лінку
import Button from "@/components/Button"; // Ваш компонент кнопки
import Image from "next/image"; // Для зображень

export default function UserList() {
  interface User {
    id: string;
    name: string;
    role: string;
    location?: string;
    image?: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/usersList")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
        Our pet lovers
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {user.image ? (
              <div className="flex justify-center mb-4">
                <Image
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {user.name}
            </h3>
            <p className="text-gray-600 mb-2">{user.role}</p>
            {user.location && (
              <p className="text-sm text-gray-500 mb-4">
                Location: {user.location}
              </p>
            )}
            <Link href={`/dashboard/${user.id}`}>
              <Button>View Profile</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
