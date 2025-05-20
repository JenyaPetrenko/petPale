//app/dashboard/[id]/page.tsx
// app/dashboard/[id]/page.tsx - the page to view  any user profile

// This file handles the dynamic route to display a public user profile.

"use client"; // Enables client-side rendering for this page

import { useParams } from "next/navigation"; // Hook to access dynamic route parameters
import PublicProfile from "@/components/Profile/PublicProfile"; // Component to display the user's public profile

// Main component for the User Profile Page
export default function UserProfilePage() {
  // Access the dynamic route parameter 'id' using the `useParams` hook
  const params = useParams();
  const id = params?.id;

  // Validate the 'id' parameter
  if (!id || Array.isArray(id)) {
    // If 'id' is missing or invalid (e.g., an array), display an error message
    return <p className="text-red-500">Invalid user ID</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main section containing the user's profile */}
      <main className="flex-1 flex items-start justify-center p-4 mt-36">
        <div className="w-full max-w-2xl">
          {/* PublicProfile component handles the display of the user's profile */}
          <PublicProfile userId={id} />
        </div>
      </main>
    </div>
  );
}
