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

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/users/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          setFormState(data.user);
        });
    }
  }, [session?.user?.email]);

  if (status === "loading") return <p className="p-4">Loading...</p>;
  if (!session)
    return <p className="p-4">You must be logged in to view this page.</p>;
  if (!user) return <p className="p-4">Loading user data...</p>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch(`/api/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (res.ok) {
      setEditMode(false);
      setUser(await res.json());
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl ">
          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            My Profile
          </h1>

          <div className="space-y-4 text-gray-700">
            <ProfileField
              label="Name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              editable={editMode}
            />
            <ProfileField label="Email" value={user.email} disabled />
            <ProfileField label="Role" value={user.role} disabled />
            <ProfileField
              label="Phone"
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
              editable={editMode}
            />
            <ProfileField
              label="Location"
              name="location"
              value={formState.location}
              onChange={handleInputChange}
              editable={editMode}
            />
          </div>

          {user.role === "owner" && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-[#426a5a] mb-4 border-b pb-2">
                Pet Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <ProfileField
                  label="Type"
                  name="petType"
                  value={formState.petType}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Name"
                  name="petName"
                  value={formState.petName}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Age"
                  name="petAge"
                  value={formState.petAge}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Breed"
                  name="petBreed"
                  value={formState.petBreed}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Gender"
                  name="petGender"
                  value={formState.petGender}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                <ProfileField
                  label="Availability"
                  name="availability"
                  value={formState.availability}
                  onChange={handleInputChange}
                  editable={editMode}
                />
                {user.petImage && (
                  <div className="mt-4">
                    <Image
                      src={user.petImage}
                      alt="Pet"
                      width={200}
                      height={200}
                      className="rounded-xl border"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {user.role === "caretaker" && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-[#426a5a] ">
                Caretaker Info
              </h2>
              <ProfileField
                label="Availability"
                name="availability"
                value={formState.availability}
                onChange={handleInputChange}
                editable={editMode}
              />
              <p>
                <span className="font-semibold">Rating:</span> ⭐⭐⭐⭐☆
              </p>
            </div>
          )}

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

function ProfileField({
  label,
  value,
  name,
  onChange,
  editable = false,
  disabled = false,
}: {
  label: string;
  value?: string | number | null;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editable?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
      <label className="font-semibold text-[#426a5a] w-32">{label}:</label>
      {editable && name ? (
        <input
          type="text"
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-1 w-full sm:w-[300px] focus:outline-none focus:ring-2 focus:ring-[#426a5a]"
        />
      ) : (
        <span>{value || "—"}</span>
      )}
    </div>
  );
}
