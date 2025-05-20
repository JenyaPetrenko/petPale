//components/Profile/PublicProfile.tsx - to be used in the dashboard page to view any user profile

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Імпорт useRouter
import Image from "next/image";
import { fetchUserById } from "@/lib/fetchUser";
import Button from "../Button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  image?: string;
  availabilityFrom?: string;
  availabilityTo?: string;
  petType?: string;
  petName?: string;
  petAge?: number;
  petBreed?: string;
  petGender?: string;
}

interface ProfileViewProps {
  userId: string;
}

export default function PublicProfile({ userId }: ProfileViewProps) {
  const [user, setUser] = useState<User | null>(null); //to store user data
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetches user data when the component mounts or the userId changes.
  useEffect(() => {
    async function loadUser() {
      try {
        const fetchedUser = await fetchUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setError("User not found");
        }
      } catch {
        setError("Error fetching user data");
      }
    }

    loadUser();
  }, [userId]); //dependency array to trigger useEffect when userId changes

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!user) {
    return <p className="text-gray-500 text-center mt-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex justify-between">
            <Button onClick={() => router.push("/dashboard")}>
              Back to List
            </Button>
            <Button onClick={() => router.push("/dashboard")}>
              Send Message
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            {user.name}&#39;s Profile
          </h1>

          <div className="flex gap-6 items-start">
            <div className="flex-1 space-y-4 text-gray-700">
              <p>
                <span className="font-semibold text-[#426a5a]">Name:</span>{" "}
                {user.name}
              </p>
              <p>
                <span className="font-semibold text-[#426a5a]">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-semibold text-[#426a5a]">Role:</span>{" "}
                {user.role}
              </p>
              <p>
                <span className="font-semibold text-[#426a5a]">Location:</span>{" "}
                {user.location || "Not provided"}
              </p>
              <p>
                <span className="font-semibold text-[#426a5a]">
                  Availability From:
                </span>{" "}
                {user.availabilityFrom
                  ? new Date(user.availabilityFrom).toLocaleDateString()
                  : "Not provided"}
              </p>
              <p>
                <span className="font-semibold text-[#426a5a]">
                  Availability To:
                </span>{" "}
                {user.availabilityTo
                  ? new Date(user.availabilityTo).toLocaleDateString()
                  : "Not provided"}
              </p>

              {user.role === "owner" && user.petType && (
                <p>
                  <span className="font-semibold text-[#426a5a]">
                    Pet Type:
                  </span>{" "}
                  {user.petType}
                </p>
              )}
              {user.role === "owner" && user.petName && (
                <p>
                  <span className="font-semibold text-[#426a5a]">
                    Pet Name:
                  </span>{" "}
                  {user.petName}
                </p>
              )}
              {user.role === "owner" && user.petAge !== undefined && (
                <p>
                  <span className="font-semibold text-[#426a5a]">Pet Age:</span>{" "}
                  {user.petAge} years
                </p>
              )}
              {user.role === "owner" && user.petBreed && (
                <p>
                  <span className="font-semibold text-[#426a5a]">
                    Pet Breed:
                  </span>{" "}
                  {user.petBreed}
                </p>
              )}
              {user.role === "owner" && user.petGender && (
                <p>
                  <span className="font-semibold text-[#426a5a]">
                    Pet Gender:
                  </span>{" "}
                  {user.petGender}
                </p>
              )}
            </div>

            {/* Права колонка з фото */}
            <div>
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-200 rounded-full border-4 border-[#426a5a]">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
