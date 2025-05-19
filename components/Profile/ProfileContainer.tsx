//component/Profile/ProfileContainer.tsx - the main profile page for user to edit their profile
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Button from "../Button";
import PublicProfile from "./PublicProfile";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  phone?: string | null;
  location?: string | null;
  availabilityFrom?: string | null; // Оновлений тип
  availabilityTo?: string | null; // Оновлений тип
  image?: string | null;
  petType?: string | null;
  petName?: string | null;
  petAge?: string | number | null;
  petBreed?: string | null;
  petGender?: string | null;
}

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null); // Використовуємо UserProfile
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // Конвертуємо Date в string
          const formattedUser: UserProfile = {
            ...data.user,
            availabilityFrom: data.user.availabilityFrom
              ? new Date(data.user.availabilityFrom).toISOString()
              : null,
            availabilityTo: data.user.availabilityTo
              ? new Date(data.user.availabilityTo).toISOString()
              : null,
          };
          setUser(formattedUser);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [session?.user?.email]);

  if (status === "loading" || !user) {
    return <p className="p-4">Loading...</p>;
  }

  if (!session) {
    return <p className="p-4">You must be logged in to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          {!editMode ? (
            <PublicProfile user={user} />
          ) : (
            <form>{/* Додайте логіку редагування */}</form>
          )}

          <div className="mt-6 flex gap-4">
            {!editMode ? (
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            ) : (
              <>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button>Save</Button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
