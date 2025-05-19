// components/Profile/ProfileContainer.tsx

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Button from "../Button";

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState<Partial<User>>({});
  const [email, setEmail] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Завантаження даних користувача після логіну
  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email;
      setEmail(userEmail);
      fetch(`/api/user/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          setFormState(data.user);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Перевірка, чи є значення новим
    setFormState((prev) => {
      if (prev[name as keyof User] === value) {
        return prev; // Не оновлюємо стан, якщо значення однакове
      }
      return { ...prev, [name]: value };
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
      Object.entries(formState).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Перевіряємо, чи є у value дата, і якщо є, конвертуємо в строку
          if (key === "availabilityFrom" || key === "availabilityTo") {
            if (value) {
              formData.append(key, new Date(value).toISOString());
            } else {
              formData.append(key, "");
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/user/${email}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to save user: ${res.statusText}`);
      }

      const updated = await res.json();
      setUser(updated.user);
      setFormState(updated.user);
      setImageFile(null);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  function ProfileField({
    label,
    value,
    name,
    onChange,
    editable = false,
    disabled = false,
    type = "text",
  }: {
    label: string;
    value?: string | number | null;
    name?: string;
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    editable?: boolean;
    disabled?: boolean;
    type?: string;
  }) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
        <label className="font-semibold text-[#426a5a] w-32">{label}:</label>
        {editable && name ? (
          <input
            name={name}
            value={value ?? ""} // Завжди передаємо рядок
            onChange={onChange}
            type={type}
            autoComplete="off" // Явно вказуємо автозаповнення
            disabled={disabled}
            className="border border-gray-300 rounded px-3 py-1 w-full sm:w-[300px] focus:outline-none focus:ring-2 focus:ring-[#426a5a]"
          />
        ) : (
          <span>{value || "Not provided"}</span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          {/* Секція: My Profile */}
          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            My Profile
          </h1>

          <div className="space-y-4 text-gray-700">
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
              value={
                formState.availabilityFrom &&
                !isNaN(new Date(formState.availabilityFrom).getTime())
                  ? new Date(formState.availabilityFrom)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              type="date"
              editable={editMode}
            />
            <ProfileField
              label="Availability Until"
              name="availabilityTo"
              value={
                formState.availabilityTo &&
                !isNaN(new Date(formState.availabilityTo).getTime())
                  ? new Date(formState.availabilityTo)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              type="date"
              editable={editMode}
            />
            {/* Зображення профілю */}
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
              <span className="text-sm text-gray-500">No image provided</span>
            )}
          </div>

          {/* Секція: Pet Information (для owner) */}
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

          {/* Кнопки для редагування та збереження */}
          <div className="mt-6 flex gap-4">
            {!editMode ? (
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            ) : (
              <>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
