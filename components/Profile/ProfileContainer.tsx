// components/Profile/ProfileContainer.tsx

"use client";

import { useEffect, useReducer, useState } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { User } from "@prisma/client";

import ProfileField from "./ProfileField";
import Button from "../Button";
import Image from "next/image";

// Type definitions for the reducer actions
type FormAction =
  | {
      type: "UPDATE_FIELD"; // Action for updating a specific field in the form.
      payload: { name: keyof User; value: string | number | Date | null }; // Contains the field name and new value.
    }
  | { type: "RESET"; payload: Partial<User> }; // Action to reset the form to its initial state.

// Reducer function for managing form state
function formReducer(state: Partial<User>, action: FormAction): Partial<User> {
  switch (action.type) {
    case "UPDATE_FIELD":
      // Updates a single field in the form state
      return { ...state, [action.payload.name]: action.payload.value };
    case "RESET":
      // Resets the form state to the provided initial data
      return action.payload;
    default:
      return state;
  }
}

export default function ProfileContainer() {
  // Hooks to manage session and user data
  const { data: session, status } = useSession(); // Access the current session and authentication status.
  const [user, setUser] = useState<User | null>(null); // Stores the currently logged-in user's data.
  const [editMode, setEditMode] = useState(false); // Tracks whether the form is in edit mode.
  const [email, setEmail] = useState<string | null>(null); // Stores the user's email.
  const [imageFile, setImageFile] = useState<File | null>(null); // Stores the selected image file.

  // Reducer for managing form state
  const [formState, dispatch] = useReducer(formReducer, {}); // Form state managed with a reducer.
  const [initialUserData, setInitialUserData] = useState<User | null>(null); // Stores the user's initial data for resetting purposes.

  // Fetch user data after login
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const userEmail = session.user.email;
        setEmail(userEmail); // Store the user's email.

        try {
          const res = await fetch(`/api/user/${userEmail}`); // Fetch the user's data from the API.
          const data = await res.json();

          setUser(data.user); // Update the user state with the fetched data.
          dispatch({ type: "RESET", payload: data.user }); // Reset the form state with the fetched user data.
          setInitialUserData(data.user); // Store the user's initial data.

          // Update the session manually with the fetched data
          const updatedSession = await getSession();
          if (updatedSession) {
            if (updatedSession?.user) {
              updatedSession.user.name = data.user.name; // Update the session with the user's name.
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error); // Handle errors during data fetch.
        }
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  // Show a loading message while the user data is being fetched
  if (status === "loading" || !user) {
    return <p className="p-4">Loading...</p>;
  }

  // Show a message if the user is not logged in
  if (!session) {
    return <p className="p-4">You must be logged in to view this page.</p>;
  }

  // Handles input changes in the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Convert to number if type is "number"
    const parsedValue = type === "number" ? Number(value) : value;

    dispatch({
      type: "UPDATE_FIELD",
      payload: { name: name as keyof User, value: parsedValue },
    });
  };

  // Handles file input changes for the profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]); // Stores the selected image file.
    }
  };

  // Handles saving the updated user data
  const handleSave = async () => {
    if (!email) return;

    try {
      const formData = new FormData();

      // Add form state fields to FormData
      Object.entries(formState).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "availabilityFrom" || key === "availabilityTo") {
            // Handle date fields
            formData.append(
              key,
              value instanceof Date ? value.toISOString() : value
            );
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add the profile picture to FormData
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/user/${encodeURIComponent(email)}`, {
        method: "PUT", // Updates the user's data via a PUT request.
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to save user: ${res.statusText}`);
      }

      const updated = await res.json();
      setUser(updated.user); // Update the user state with the saved data.
      dispatch({ type: "RESET", payload: updated.user }); // Reset the form state with the saved data.
      setImageFile(null); // Clear the uploaded image file.
      setEditMode(false); // Exit edit mode.

      // Update the session after saving changes
      const updatedSession = await signIn("credentials", {
        redirect: false,
        email: updated.user.email,
      });

      if (!updatedSession) {
        console.error("Failed to update session after profile update.");
      }
    } catch (error) {
      console.error("Error saving user data:", error); // Handle errors during save.
    }
  };

  // Handles canceling edits
  const handleCancel = () => {
    setEditMode(false); // Exit edit mode.
    dispatch({ type: "RESET", payload: initialUserData || {} }); // Revert form state to initial data.
    setImageFile(null); // Clear the uploaded image file.
  };

  // Handles deleting the user's account
  const handleDeleteAccount = async () => {
    if (!email) return;

    const confirmation = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    ); // Confirm the action with the user.
    if (!confirmation) return;

    try {
      const res = await fetch(`/api/user/${encodeURIComponent(email)}`, {
        method: "DELETE", // Deletes the user's account via a DELETE request.
      });

      if (!res.ok) {
        throw new Error(`Failed to delete account: ${res.statusText}`);
      }

      await signOut({ callbackUrl: "/" }); // Log out the user and redirect to the homepage.
    } catch (error) {
      console.error("Error deleting account:", error); // Handle errors during deletion.
      alert("An error occurred while deleting your account. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            My Profile
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
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
                  value={formState.petAge || 0}
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
    </div>
  );
}
