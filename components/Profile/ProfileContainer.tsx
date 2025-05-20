// components/Profile/ProfileContainer.tsx

"use client";

import { useEffect, useReducer, useState } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { User } from "@prisma/client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ProfileField from "./ProfileField";
import Button from "../Button";
import Image from "next/image";

// Описуємо типи для дій у редюсері
type FormAction =
  | {
      type: "UPDATE_FIELD";
      payload: { name: keyof User; value: string | number | Date | null };
    }
  | { type: "RESET"; payload: Partial<User> };

// Reducer для управління станом форми
function formReducer(state: Partial<User>, action: FormAction): Partial<User> {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.name]: action.payload.value };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Використовуємо useReducer для управління станом форми
  const [formState, dispatch] = useReducer(formReducer, {});
  const [initialUserData, setInitialUserData] = useState<User | null>(null); // Початкові дані користувача

  // Завантаження даних користувача після логіну
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const userEmail = session.user.email;
        setEmail(userEmail);

        try {
          const res = await fetch(`/api/user/${userEmail}`);
          const data = await res.json();

          setUser(data.user);
          dispatch({ type: "RESET", payload: data.user }); // Оновлюємо стан форми
          setInitialUserData(data.user); // Зберігаємо початковий стан

          // Оновлюємо сесію вручну
          const updatedSession = await getSession();
          if (updatedSession) {
            if (updatedSession?.user) {
              updatedSession.user.name = data.user.name; // Оновлюємо локальні дані сесії
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  if (status === "loading" || !user) {
    return <p className="p-4">Loading...</p>;
  }

  if (!session) {
    return <p className="p-4">You must be logged in to view this page.</p>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FIELD",
      payload: { name: name as keyof User, value },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!email) return;

    try {
      const formData = new FormData();

      // Формуємо FormData з formState
      Object.entries(formState).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "availabilityFrom" || key === "availabilityTo") {
            formData.append(
              key,
              value instanceof Date ? value.toISOString() : value
            );
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/user/${encodeURIComponent(email)}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to save user: ${res.statusText}`);
      }

      const updated = await res.json();
      setUser(updated.user);
      dispatch({ type: "RESET", payload: updated.user });
      setImageFile(null);
      setEditMode(false);

      // Оновлюємо сесію після успішного редагування
      const updatedSession = await signIn("credentials", {
        redirect: false,
        email: updated.user.email,
      });

      if (!updatedSession) {
        console.error("Failed to update session after profile update.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    dispatch({ type: "RESET", payload: initialUserData || {} }); // Відновлюємо початкові дані
    setImageFile(null); // Якщо потрібно, очищаємо фото
  };

  const handleDeleteAccount = async () => {
    if (!email) return;

    // Попереджувальне повідомлення для підтвердження
    const confirmation = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmation) return;

    try {
      const res = await fetch(`/api/user/${encodeURIComponent(email)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete account: ${res.statusText}`);
      }

      // Виходимо з облікового запису та перенаправляємо на початкову сторінку
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            My Profile
          </h1>

          {/* Контейнер для інформації та фото */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Ліва колонка з інформацією */}
            <div className="flex-1 space-y-4 text-gray-700">
              <ProfileField
                label="Name"
                name="name"
                value={formState.name || ""}
                onChange={handleInputChange}
                editable={editMode}
              />
              <ProfileField label="Email" value={user.email} disabled />
              <ProfileField
                label="Role"
                name="role"
                value={formState.role || ""}
                onChange={handleInputChange}
                editable={editMode}
              />
              <ProfileField
                label="Phone"
                name="phone"
                value={formState.phone || ""}
                onChange={handleInputChange}
                editable={editMode}
              />
              <ProfileField
                label="Location"
                name="location"
                value={formState.location || ""}
                onChange={handleInputChange}
                editable={editMode}
              />
              <ProfileField
                label="Availability From"
                name="availabilityFrom"
                value={formState.availabilityFrom || ""}
                onChange={handleInputChange}
                type="date"
                editable={editMode}
              />
              <ProfileField
                label="Availability Until"
                name="availabilityTo"
                value={formState.availabilityTo || ""}
                onChange={handleInputChange}
                type="date"
                editable={editMode}
              />
              {editMode && (
                <div className="mb-2">
                  <label className="font-semibold text-[#426a5a] w-32 block">
                    Add Photo:
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded px-3 py-1"
                  />
                </div>
              )}
            </div>

            {/* Права колонка з фото */}
            <div>
              {!editMode && user.image && (
                <div className="mt-4">
                  <Image
                    src={`${user.image}?${Date.now()}`}
                    alt="User Profile"
                    width={200}
                    height={200}
                    className="rounded-xl border"
                  />
                </div>
              )}
              {!editMode && !user.image && (
                <div className="mt-4 w-48 h-48 flex items-center justify-center bg-gray-200 rounded-lg">
                  <span className="text-gray-500">No image provided</span>
                </div>
              )}
            </div>
          </div>

          {user.role === "owner" && (
            <>
              <h2 className="text-2xl font-semibold text-[#426a5a] mt-8 mb-4 border-b pb-2">
                Pet Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <ProfileField
                  label="Pet Type"
                  name="petType"
                  value={formState.petType || ""}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Pet Name"
                  name="petName"
                  value={formState.petName || ""}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Pet Age"
                  name="petAge"
                  value={formState.petAge || ""}
                  onChange={handleInputChange}
                  editable={editMode}
                  type="number"
                />
                <ProfileField
                  label="Pet Gender"
                  name="petGender"
                  value={formState.petGender || ""}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Pet Breed"
                  name="petBreed"
                  value={formState.petBreed || ""}
                  onChange={handleInputChange}
                  editable={editMode}
                />
              </div>
            </>
          )}

          <div className="mt-6 flex gap-4">
            {!editMode ? (
              <>
                <Button onClick={() => setEditMode(true)}>Edit</Button>
                <Button onClick={handleDeleteAccount} variant="danger">
                  Delete Account
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
