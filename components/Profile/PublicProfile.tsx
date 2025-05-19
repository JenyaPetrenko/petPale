//components/Profile/PublicProfile.tsx - to be used in the dashboard page to view any user profile

import Image from "next/image";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  phone?: string | null;
  location?: string | null;
  availabilityFrom?: string | null;
  availabilityTo?: string | null;
  image?: string | null;
  petType?: string | null;
  petName?: string | null;
  petAge?: string | number | null;
  petBreed?: string | null;
  petGender?: string | null;
}

export default function PublicProfile({ user }: { user: UserProfile }) {
  if (!user) {
    return (
      <p className="text-gray-500 text-center mt-4">No user data available</p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f8]">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            {user.name || "No name provided"}&#39;s Profile
          </h1>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold text-[#426a5a]">Name:</span>{" "}
              {user.name || "Not provided"}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Role:</span>{" "}
              {user.role || "Not provided"}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Phone:</span>{" "}
              {user.phone || "Not provided"}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Location:</span>{" "}
              {user.location || "Not provided"}
            </p>
          </div>

          {user.image && (
            <div className="mt-6 flex justify-center">
              <Image
                src={user.image}
                alt={`${user.name || "User"}'s profile`}
                width={200}
                height={200}
                className="rounded-full border-4 border-[#426a5a]"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
